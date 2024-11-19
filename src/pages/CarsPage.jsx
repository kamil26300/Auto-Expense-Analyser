import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoPlayBack } from "react-icons/io5";
import Layout from "../components/Layout";
import { GiCarSeat } from "react-icons/gi";

const CarsPage = () => {
  const location = useLocation(); // or use 'useLocation' from 'react-router-dom' if you're using React Router
  const navigate = useNavigate();
  const [selectedCars, setSelectedCars] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [driveDistance, setDriveDistance] = useState([]);

  const handleSelect = (ID) => {
    // Check if the car is already selected
    if (selectedCars.includes(ID)) {
      // Deselect the car
      setSelectedCars((prev) => prev.filter((item) => item !== ID));
    } else if (selectedCars.length < 4) {
      // Add the car if max selection limit is not reached
      setSelectedCars((prev) => [...prev, ID]);
    } else {
      alert("You can only select up to 4 cars!");
    }
  };

  useEffect(() => {
    const queryString = location.search.substring(1); // Extract query string from URL
    const queryParams = new URLSearchParams(queryString); // Parse the query string into an object

    // Get the value of 'driveDistance' from the query params, if it exists
    setDriveDistance(queryParams.get("driveDistance"));

    fetchCars(queryString); // Call the API to fetch cars based on the query
  }, [location]);

  const fetchCars = async (queryString) => {
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:5000/cars?${queryString}`);
      const data = await response.json();
      setCars(data); // Process the data (list of cars)
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompare = () => {
    if (selectedCars.length === 0) {
      alert("Please select at least one car to compare!");
      return;
    }

    const ids = selectedCars.join(",");
    navigate(`/compare?id=${ids}&driveDistance=${driveDistance}`);
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-8 rounded-small bg-dark-blue m-container text-off-white p-6">
        <BreadCrumbs
          back={"/"}
        />
        {loading && <p>Loading...</p>}
        {cars.length > 0 &&
          cars.map((car) => (
            <div key={car.ID} className="flex items-center justify-between">
              {/* Car Details */}
              <div className="grid grid-cols-1 gap-6 w-full">
                <div className="rounded-small p-4 grid grid-cols-2">
                  {/* Car Manufacturer and Model */}
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                      <div className="text-2xl font-bold">
                        {car.Manufacturer}
                      </div>
                      <span className="text-xl font-semibold text-gray-300">
                        {car.Name}
                      </span>
                    </div>
                    <div className="flex gap-6">
                      <p className="text-lg">{car["Engine CC"]} CC</p>
                      <p className="text-lg">{car.Power} bhp</p>
                      <p className="text-lg flex items-center gap-2">
                        {car.Seats} <GiCarSeat />
                      </p>
                    </div>
                  </div>

                  {/* Fuel, Transmission, and Mileage */}
                  <div className="flex flex-col text-gray-300 gap-2 w-min items-center">
                    <p className="text-xl text-off-white">
                      ₹{car["actual cost"].toLocaleString()}
                    </p>
                    <div className="flex gap-4">
                      <p className="text-lg">{car.Fuel_Type}</p>
                      <p className="text-lg">{car.Transmission}</p>
                      <p className="text-lg">{car["Mileage Km/L"]}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <input
                  type="checkbox"
                  className="w-6 h-6 accent-light-blue"
                  checked={selectedCars.includes(car.ID)}
                  onChange={() => handleSelect(car.ID)}
                />
              </div>
            </div>
          ))}
      </div>
      {selectedCars.length > 0 && (
        <div
          className="bg-off-white h-24 w-full fixed bottom-0 left-0 shadow-2xl py-4 px-container flex items-center justify-start gap-12"
          style={{
            boxShadow: "0px -2px 6px rgba(0, 0, 0, 1)", // Top shadow
          }}
        >
          <div className="flex gap-8">
            {selectedCars.map((id) => {
              const current = cars.find((car) => car.ID === id);
              return (
                <div className="shadow-lg px-4 py-2 bg-dark-blue rounded-small text-off-white">
                  <div className="flex gap-2">
                    <p>{current?.Manufacturer}</p>
                    <p>{current?.Name}</p>
                  </div>
                  ₹ {current["actual cost"].toLocaleString()}
                </div>
              );
            })}
          </div>
          <button
            className={
              "text-off-white py-2 px-4 rounded-small h-min bg-light-blue disabled:bg-gray-400 disabled:cursor-not-allowed"
            }
            disabled={selectedCars.length < 2}
            onClick={handleCompare}
          >
            {selectedCars.length} / 4 Compare
          </button>
        </div>
      )}
    </Layout>
  );
};

const BreadCrumbs = ({ back }) => {
  return (
    <div className="w-full flex justify-between border-b pb-2 border-off-white">
      <Link
        className="flex justify-center items-center gap-2 hover:text-light-blue hover:underline"
        to={back}
      >
        <IoPlayBack /> Previous
      </Link>
    </div>
  );
};

export default CarsPage;

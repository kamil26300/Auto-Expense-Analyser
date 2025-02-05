import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Table from "rc-table";
import { IoPlayBack } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

const ComparePage = () => {
  const navigate = useNavigate();
  const [carDetails, setCarDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const queryString = location.search.substring(1);

        const url = `https://normal-euphemia-hello263-ba7ccd33.koyeb.app/car-details?${queryString}`;

        // Fetch data from the API
        const response = await fetch(url);
        const data = await response.json();

        // Set the response data into state
        setCarDetails(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch car details.");
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, []);

  const columns = [
    {
      title: "Feature",
      dataIndex: "feature",
      key: "feature",
    },
    ...carDetails.map((car, index) => ({
      title: `${car.carData.Manufacturer} - ${car.carData.Name}`,
      dataIndex: `car${index}`,
      key: `car${index}`,
    })),
  ];

  const data = [
    {
      key: "1",
      feature: "Cost",
      ...carDetails.reduce((acc, car, index) => {
        acc[`car${index}`] = new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0, // For no decimal points
        }).format(car.carData["actual cost"]);
        return acc;
      }, {}),
    },
    {
      key: "2",
      feature: "Fuel",
      ...carDetails.reduce((acc, car, index) => {
        acc[`car${index}`] = car.carData.Fuel_Type;
        return acc;
      }, {}),
    },
    {
      key: "3",
      feature: "Mileage",
      ...carDetails.reduce((acc, car, index) => {
        acc[`car${index}`] = car.carData["Mileage Km/L"];
        return acc;
      }, {}),
    },
    {
      key: "4",
      feature: "Engine CC",
      ...carDetails.reduce((acc, car, index) => {
        acc[`car${index}`] = car.carData["Engine CC"];
        return acc;
      }, {}),
    },
    {
      key: "5",
      feature: "Power (bhp)",
      ...carDetails.reduce((acc, car, index) => {
        acc[`car${index}`] = Math.trunc(car.carData["Power"]);
        return acc;
      }, {}),
    },
    {
      key: "6",
      feature: "Transmission Type",
      ...carDetails.reduce((acc, car, index) => {
        acc[`car${index}`] = car.carData.Transmission;
        return acc;
      }, {}),
    },
  ];

  const dataOutput = [
    {
      key: "7",
      feature: "Maintenance Cost",
      ...carDetails.reduce((acc, car, index) => {
        acc[`car${index}`] = new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0, // For no decimal points
        }).format(car.output.maintenance_cost);
        return acc;
      }, {}),
    },
    {
      key: "8",
      feature: "Fuel Cost",
      ...carDetails.reduce((acc, car, index) => {
        acc[`car${index}`] = new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0, // For no decimal points
        }).format(car.output.fuel_cost);
        return acc;
      }, {}),
    },
    {
      key: "9",
      feature: "Depreciated Cost",
      ...carDetails.reduce((acc, car, index) => {
        acc[`car${index}`] =
          new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0, // For no decimal points
          }).format(car.output.depreciation) +
          ` (${(
            ((car.carData["actual cost"] - car.output.depreciation) /
              car.carData["actual cost"]) *
            100
          ).toFixed(2)}%)`;
        return acc;
      }, {}),
    },
  ];

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Layout>
      <div className="bg-dark-blue m-container rounded-small p-6 text-off-white shadow-lg ">
        <div className="w-full border-b border-off-white pb-2 mb-2">
          <button
            className="flex items-center gap-2 hover:text-light-blue hover:underline"
            onClick={() => navigate(-1)}
          >
            <IoPlayBack /> Previous
          </button>
        </div>
        <Table
          columns={columns}
          className="table-modern"
          data={data}
          bordered={false}
          rowKey="key"
          scroll={{ x: true }}
        />
      </div>
      <div className="bg-dark-blue m-container rounded-small p-6 pt-0 text-off-white shadow-lg ">
        <div className="items-start w-full justify-start flex text-xl font-bold translate-y-8">
          Ownership Cost (5 years)
        </div>
        <Table
          columns={columns}
          className="table-modern hidden-h"
          data={dataOutput}
          bordered={false}
          rowKey="key"
          scroll={{ x: true }}
        />
      </div>
    </Layout>
  );
};

export default ComparePage;

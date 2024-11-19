import { useState, useEffect } from 'react';

export const budgetOptions = [
  { value: "1-5", label: "₹ 1 Lakh - ₹ 5 Lakh" },
  { value: "5-10", label: "₹ 5 Lakh - ₹ 10 Lakh" },
  { value: "10-12", label: "₹ 10 Lakh - ₹ 12 Lakh" },
  { value: "12-15", label: "₹ 12 Lakh - ₹ 15 Lakh" },
  { value: "15-20", label: "₹ 15 Lakh - ₹ 20 Lakh" },
  { value: "20-25", label: "₹ 20 Lakh - ₹ 25 Lakh" },
  { value: "25-30", label: "₹ 25 Lakh - ₹ 30 Lakh" },
  { value: "30-35", label: "₹ 30 Lakh - ₹ 35 Lakh" },
  { value: "35-40", label: "₹ 35 Lakh - ₹ 40 Lakh" },
  { value: "40-45", label: "₹ 40 Lakh - ₹ 45 Lakh" },
  { value: "45-50", label: "₹ 45 Lakh - ₹ 50 Lakh" },
  { value: "greaterThan50", label: "Greater than ₹ 50 Lakh" },
];


export const useCarData = () => {
  const [carData, setCarData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/fetch-car-filters");
        const result = await response.json();

        if (response.ok) {
          // Store the data in state
          setCarData(result.data);
        } else {
          console.error("Failed to fetch data:", result.error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Return the car data and loading state
  return { carData, loading };
};
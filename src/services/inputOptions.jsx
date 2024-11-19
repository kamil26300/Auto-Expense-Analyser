import { useState, useEffect } from 'react';

export const budgetOptions = [
  { value: "1-5", label: "₹ 1 Lakh - ₹ 5 Lakh" },
  { value: "6-10", label: "₹ 6 Lakh - ₹ 10 Lakh" },
  { value: "11-15", label: "₹ 11 Lakh - ₹ 15 Lakh" },
  { value: "16-20", label: "₹ 16 Lakh - ₹ 20 Lakh" },
  { value: "21-25", label: "₹ 21 Lakh - ₹ 25 Lakh" },
  { value: "26-30", label: "₹ 26 Lakh - ₹ 30 Lakh" },
  { value: "31-35", label: "₹ 31 Lakh - ₹ 35 Lakh" },
  { value: "36-40", label: "₹ 36 Lakh - ₹ 40 Lakh" },
  { value: "41-45", label: "₹ 41 Lakh - ₹ 45 Lakh" },
  { value: "46-50", label: "₹ 46 Lakh - ₹ 50 Lakh" },
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
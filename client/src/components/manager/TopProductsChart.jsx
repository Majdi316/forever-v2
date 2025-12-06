//TODO Libraries
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { useContext } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
//TODO MUI Components
import { Card, Typography } from "@mui/material";
//TODO Context
import { UserContext } from "../../context/UserContext";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
//TODO Main Component
const TopProductsChart = ({ year }) => {
  //TODO Variables
  const { backendUrl, token, paperTheme } = useContext(UserContext);
  //TODO States
  const [topProducts, setTopProducts] = useState([]);
  //TODO Functions
  const fetchTopProducts = async () => {
    try {
      const res = await axios.get(
        `${backendUrl}/api/manager/earnings/top-products?year=${year}&limit=5`,
        { headers: { "x-auth-token": token } }
      );
      setTopProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  //TODO useEffects
  useEffect(() => {
    fetchTopProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year]);
  //TODO Draw Charts
  const chartData = {
    labels: topProducts.map((p) => p._id),
    datasets: [
      {
        label: "Quantity Sold",
        data: topProducts.map((p) => p.totalQuantity),
        backgroundColor: "#ca8a04",
        borderRadius: 6,
        animation: { duration: 1200, easing: "easeOutBounce" },
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "top" } },
    scales: { y: { beginAtZero: true } },
  };
  //TODO Return
  return (
    <Card
      style={paperTheme}
      className="p-4 md:p-6 rounded-2xl shadow-lg w-full mt-10"
    >
      <Typography variant="h6" className="font-bold mb-4">
        Top Selling Products ({year})
      </Typography>
      <div className="relative w-full h-[350px]">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </Card>
  );
};

export default TopProductsChart;

//TODO Libraries
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useContext } from "react";
//TODO MUI Components
import { Card, Button, Typography } from "@mui/material";
//TODO Context
import { UserContext } from "../../context/UserContext";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
//TODO Main Component
const EarningsChart = ({ year }) => {
  //TODO Variables
  const chartRef = useRef(null);
  const { backendUrl, token, paperTheme, buttonTheme } =
    useContext(UserContext);
  //TODO States
  const [monthlyEarnings, setMonthlyEarnings] = useState([]);
  const [monthlyOrders, setMonthlyOrders] = useState([]);
  //TODO Functions
  const fetchData = async () => {
    try {
      const earningsRes = await axios.get(
        `${backendUrl}/api/manager/earnings/monthly?year=${year}`,
        { headers: { "x-auth-token": token } }
      );
      const ordersRes = await axios.get(
        `${backendUrl}/api/manager/earnings/monthly-orders?year=${year}`,
        { headers: { "x-auth-token": token } }
      );
      setMonthlyEarnings(earningsRes.data);
      setMonthlyOrders(ordersRes.data);
    } catch (error) {
      console.error(error);
    }
  };
  //TODO useEffects
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year]);
  //TODO Draw Chart
  const totalYearEarnings = monthlyEarnings.reduce((acc, val) => acc + val, 0);

  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const earningsData = {
    labels,
    datasets: [
      {
        label: `Earnings ${year}`,
        data: monthlyEarnings,
        backgroundColor: "#22c55e", // green-500 hex
        borderRadius: 6,
        animation: { duration: 1200, easing: "easeOutQuart" },
      },
    ],
  };
  const ordersData = {
    labels,
    datasets: [
      {
        label: `Orders ${year}`,
        data: monthlyOrders,
        backgroundColor: "#2563eb",
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

  const downloadChart = () => {
    const chart = chartRef.current;
    const url = chart.toBase64Image();
    const link = document.createElement("a");
    link.href = url;
    link.download = `earnings-${year}.png`;
    link.click();
  };

  const exportToExcel = () => {
    const excelData = labels.map((month, idx) => ({
      Month: month,
      Earnings: monthlyEarnings[idx],
      Orders: monthlyOrders[idx],
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Analytics");

    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([buffer], { type: "application/octet-stream" }),
      `Analytics-${year}.xlsx`
    );
  };
  //TODO Return
  return (
    <Card
      style={paperTheme}
      className="p-4 md:p-6 rounded-2xl shadow-lg w-full mb-10"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <Typography variant="h6" className="font-bold">
          Monthly Earnings & Orders
        </Typography>
        <div className="flex gap-2 flex-wrap">
          <Button sx={buttonTheme} onClick={downloadChart}>
            Download Chart
          </Button>
          <Button sx={buttonTheme} onClick={exportToExcel}>
            Export Excel
          </Button>
        </div>
      </div>

      <div className="mb-6  font-semibold">
        Total Earnings: $ {totalYearEarnings.toLocaleString()}
      </div>

      <div className="relative w-full h-[320px] md:h-[400px]">
        <Bar ref={chartRef} data={earningsData} options={chartOptions} />
      </div>

      <div className="relative w-full h-[320px] md:h-[400px] mt-10">
        <Bar data={ordersData} options={chartOptions} />
      </div>
    </Card>
  );
};

export default EarningsChart;

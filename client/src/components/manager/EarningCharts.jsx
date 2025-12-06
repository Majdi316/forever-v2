//TODO Libraries
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useContext } from "react";
//TODO MUI Component
import { Typography, Button, TextField } from "@mui/material";
//TODO Context
import { UserContext } from "../../context/UserContext";
//TODO Component
import EarningsChart from "./EarningsChart";
import TopProductsChart from "./TopProductsChart";
//TODO Theme
import { customTextFieldStyles } from "../../helper/styeTextInput";
import { DARK_MODE, LIGHT_MODE } from "../../theme/themeData";
//TODO Main Component
const EarningCharts = () => {
  //TODO Variables
  const { backendUrl, token, buttonTheme, titleTheme, paperTheme, theme } =
    useContext(UserContext);
  const dashboardRef = useRef(null);

    //TODO States
  const [year, setYear] = useState(new Date().getFullYear());
  const [kpi, setKPI] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    topProduct: "N/A",
    topProductQuantity: 0,
  });

//TODO Functions
  const fetchKPI = async () => {
    try {
      const res = await axios.get(
        `${backendUrl}/api/manager/earnings/kpi?year=${year}`,
        { headers: { "x-auth-token": token } }
      );
      setKPI(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  //-----------------------------------------
   const exportPDF = async () => {
    if (!dashboardRef.current) return;
    const canvas = await html2canvas(dashboardRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Dashboard-${year}.pdf`);
  };
//TODO useEffects
  useEffect(() => {
    fetchKPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year]);
 //TODO Return
  return (
    <div className="min-h-screen flex">
      <main className="flex-1 p-6" ref={dashboardRef}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <Typography style={titleTheme} variant="h4" className="font-bold">
            Manager Analytics Dashboard
          </Typography>
          <div className="flex gap-3 flex-wrap">
            <TextField
              sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="border rounded px-3 py-1 w-32 text-center"
            />
            <Button sx={buttonTheme} onClick={exportPDF}>
              Export Dashboard PDF
            </Button>
          </div>
        </div>
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div
            style={paperTheme}
            className=" rounded-2xl shadow p-4 text-center"
          >
            <Typography sx={titleTheme}>Total Revenue</Typography>
            <Typography
              style={{
                color: "#16a34a",
                fontWeight: "bold",
                fontSize: "1.25rem",
              }}
            >
              $ {kpi.totalRevenue.toLocaleString()}
            </Typography>
          </div>
          <div style={paperTheme} className="rounded-2xl shadow p-4 text-center">
            <Typography sx={titleTheme}>Total Orders</Typography>
            <Typography className=" font-bold text-xl">
              {kpi.totalOrders}
            </Typography>
          </div>
          <div style={paperTheme} className=" rounded-2xl shadow p-4 text-center">
            <Typography sx={titleTheme}>Top Product</Typography>
            <Typography className=" font-bold text-xl">
              {kpi.topProduct}
            </Typography>
          </div>
          <div style={paperTheme} className=" rounded-2xl shadow p-4 text-center">
            <Typography sx={titleTheme}>Units Sold</Typography>
            <Typography className=" font-bold text-xl">
              {kpi.topProductQuantity}
            </Typography>
          </div>
        </div>

        {/* Charts */}
        <EarningsChart year={year} />
        <TopProductsChart year={year} />
      </main>
    </div>
  );
};

export default EarningCharts;

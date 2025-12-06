// TODO Libraries
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// TODO MUI
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";

// TODO Icons
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ReviewsIcon from "@mui/icons-material/Reviews";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// TODO Context
import { UserContext } from "../../context/UserContext";
//TODO Main Component
const ViewTotal = () => {
  //TODO Variables
  const { backendUrl, token, titleTheme, paperTheme, paragraphTheme } =
    useContext(UserContext);
  //TODO States
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalReviews: 0,
    totalContact: 0,
    totalOrders: 0,
  });

  const [loading, setLoading] = useState(false);
//TODO Functions
  const fetchTotalData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/manager/total-data`, {
        headers: {
          "x-auth-token": token,
        },
      });
      if (data.success) {
        setStats({
          totalProducts: data.totalProducts,
          totalUsers: data.totalUsers,
          totalReviews: data.totalReviews,
          totalContact: data.totalContact,
          totalOrders: data.totalOrders,
        });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load dashboard data"
      );
    } finally {
      setLoading(false);
    }
  };
  //TODO useEffect
  useEffect(() => {
    fetchTotalData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //TODO Global Variable
  const statCards = [
    {
      label: "Products",
      value: stats.totalProducts,
      icon: <InventoryIcon className="text-blue-500" fontSize="large" />,
    },
    {
      label: "Users",
      value: stats.totalUsers,
      icon: <PeopleAltIcon className="text-green-500" fontSize="large" />,
    },
    {
      label: "Reviews",
      value: stats.totalReviews,
      icon: <ReviewsIcon className="text-purple-500" fontSize="large" />,
    },
    {
      label: "Contacts",
      value: stats.totalContact,
      icon: <ContactSupportIcon className="text-orange-500" fontSize="large" />,
    },
    {
      label: "Orders",
      value: stats.totalOrders,
      icon: <ShoppingCartIcon className="text-red-500" fontSize="large" />,
    },
  ];
  //TODO Return
  return (
    <div className="p-6 w-full h-full">
      <div className="mb-6">
        <h2 style={titleTheme} className="text-2xl font-bold">
          Admin Dashboard
        </h2>
        <p style={paragraphTheme}>System Overview</p>
      </div>
      {loading ? (
        <div className="flex justify-center mt-20">
          <CircularProgress />
        </div>
      ) : (
        <div className=" w-full flex flex-col sm:flex-row gap-5">
          {statCards.map((item, index) => (
            <div onClick={() => {}} className=" w-full" key={index}>
              <Card
                sx={paperTheme}
                key={index}
                className=" w-full backdrop-blur-md  shadow-lg rounded-2xl cursor-pointer hover:scale-110 transition-all delay-2500 ease-in-out"
              >
                <CardContent className="flex items-center justify-between">
                  <div>
                    <Typography variant="subtitle2">{item.label}</Typography>
                    <Typography
                      sx={titleTheme}
                      variant="h4"
                      className="font-bold"
                    >
                      {item.value}
                    </Typography>
                  </div>

                  <div className="p-3 rounded-full">{item.icon}</div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
     
    </div>
  );
};

export default ViewTotal;

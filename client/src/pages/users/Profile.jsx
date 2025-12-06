//TODO Libraries
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
//TODO MUI Components
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Chip,
  Divider,
  Button,
} from "@mui/material";
//TODO Context
import { UserContext } from "../../context/UserContext";
//TODO Theme
import { DARK_MODE, LIGHT_MODE } from "../../theme/themeData";
//TODO Components
import MyReviews from "../../components/users/MyReviews";
import MyFavorite from "../../components/users/MyFavorite";
import MyProducts from "../../components/users/MyProducts";
import ProfileItem from "../../components/users/ProfileItem";
import StatBox from "../../components/users/StatBox";
//TODO Main Component
const Profile = () => {
  //TODO States
  const [page, setPage] = useState(1);
  const [myInfo, setMyInfo] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(null);
  const [myProducts, setMyProducts] = useState(null);
  //TODO Variables
  const limit = 3;
  const {
    backendUrl,
    token,
    user,
    theme,
    titleTheme,
    paragraphTheme,
    navigate,
    buttonTheme,
  } = useContext(UserContext);
  //TODO Functions
  //--------------------------------------
  const fetchMyProducts = async () => {
    try {
      setLoading(true);
      setLoading(true);
      const res = await axios.get(
        `${backendUrl}/api/employee/${user?._id}/products?page=1&limit=3`,
        {
          headers: { "x-auth-token": token },
        }
      );
      if (res.data.success) {
        setMyProducts(res.data);
      }
      // eslint-disable-next-line no-unused-vars, no-empty
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  //--------------------------------------
  const fetchFavoriteProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${backendUrl}/api/products/my-favorite/${user?._id}/products?page=1&limit=3`,
        {
          headers: { "x-auth-token": token },
        }
      );
      if (res.data.success) {
        setFavorite(res.data);
      }
      // eslint-disable-next-line no-unused-vars, no-empty
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  //--------------------------------------
  const fetchUserData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${backendUrl}/api/users/profile/${user?._id}`,
        {
          headers: { "x-auth-token": token },
        }
      );
      if (res.data.success) {
        setMyInfo(res.data.data);
      }
      // eslint-disable-next-line no-unused-vars, no-empty
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  //--------------------------------------
  const fetchReviewsData = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${backendUrl}/api/users/my-reviews/${user?._id}/reviews?page=${pageNumber}&limit=${limit}`,
        {
          headers: { "x-auth-token": token },
        }
      );
      if (res.data.success) {
        setReviews(res.data);
        setPage(res.data.page);
        setTotalPages(res.data.totalPages);
      }
      // eslint-disable-next-line no-unused-vars, no-empty
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  //TODO useEffects
  //--------------------------------------
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  //--------------------------------------
  useEffect(() => {
    window.scrollTo(0, 0);
    if (user?._id) {
      fetchUserData();
      fetchReviewsData(page);
      fetchFavoriteProducts();
      fetchMyProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, page]);

  /* ================= LOADING UI ================= */
  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl animate-pulse">Loading profile...</p>
      </div>
    );
  }

  /* ================= NO DATA ================= */
  if (!myInfo) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p>No profile data found</p>
      </div>
    );
  }
  /* ================= RETURN ================= */
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-4 py-6">
      <Card
        sx={{
          border: "none",
          boxShadow: "none",
          bgcolor:
            theme === "dark" ? DARK_MODE.Secondary : LIGHT_MODE.Secondary,
        }}
        className="w-full max-w-5xl"
      >
        <CardContent className="p-6">
          {/* ===== Header ===== */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-5">
            {/* ===== image ===== */}
            <Avatar
              src={myInfo?.image?.url}
              alt={myInfo?.image?.alt}
              className="!w-32 !h-32 shadow-lg"
            />
            {/* ===== Full Name ===== */}
            <div className="text-center md:text-left w-full">
              <div className=" flex flex-col sm:flex-row items-center justify-between">
                <Typography sx={titleTheme} variant="h5" className="font-bold">
                  {myInfo?.name?.first} {myInfo?.name?.middle}{" "}
                  {myInfo?.name?.last}
                </Typography>
                <Button
                  sx={buttonTheme}
                  onClick={() => navigate(`/users/profile/update/${user._id}`)}
                >
                  UPDATE
                </Button>
              </div>

              {/* ===== email ===== */}
              <Typography sx={paragraphTheme}>{myInfo?.email}</Typography>
              {/* ===== states ===== */}
              <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                {myInfo.isEmployee && <Chip label="Employee" color="primary" />}
                {myInfo.isManager && <Chip label="Manager" color="secondary" />}
                {myInfo.isVerified && <Chip label="Verified" color="success" />}
                {!myInfo.isVerified && (
                  <Chip label="Not Verified" color="warning" />
                )}
                {myInfo.isBlocked && <Chip label="Blocked" color="error" />}
                {myInfo.isSubscribe && <Chip label="Subscribed" color="info" />}
              </div>
            </div>
          </div>
          <Divider sx={{ bgcolor: theme === "dark" ? "white" : "" }} />
          {/* ===== Info Grid ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-5">
            {/* Left */}
            <div className="space-y-4">
              <ProfileItem label="Phone" value={myInfo?.phone} />
              <ProfileItem label="Age" value={myInfo?.age} />
              <ProfileItem label="Gender" value={myInfo?.gender} />
              <ProfileItem
                label="Last Login"
                value={new Date(myInfo?.lastLogin).toLocaleString()}
              />
              <ProfileItem
                label="Last Activity"
                value={new Date(myInfo?.lastActivity).toLocaleString()}
              />
            </div>
            {/* Right */}
            <div className="space-y-4">
              <ProfileItem label="Country" value={myInfo?.address?.country} />
              <ProfileItem label="State" value={myInfo?.address?.state} />
              <ProfileItem label="City" value={myInfo?.address?.city} />
              <ProfileItem label="Street" value={myInfo?.address?.street} />
              <ProfileItem
                label="House Number"
                value={myInfo?.address?.houseNumber}
              />
              <ProfileItem label="Zip Code" value={myInfo?.address?.zip} />
            </div>
          </div>
          <Divider sx={{ bgcolor: theme === "dark" ? "white" : "" }} />
          {/* ===== Footer Stats ===== */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mt-5">
            <StatBox
              label="Employee"
              value={myInfo.isEmployee ? "Yes" : "No"}
            />
            <StatBox label="Manager" value={myInfo.isManager ? "Yes" : "No"} />
            <StatBox
              label="Verified"
              value={myInfo.isVerified ? "Yes" : "No"}
            />
          </div>
          <div
            style={{ color: DARK_MODE.Accent }}
            className=" letterSpacing text-center text-sm mt-6 font-semibold"
          >
            Account Created At:{" "}
            {new Date(myInfo.createdAt).toLocaleDateString()}
          </div>
        </CardContent>
      </Card>
      <MyReviews
        reviews={reviews}
        loading={loading}
        totalPages={totalPages}
        page={page}
        setPage={setPage}
      />
      <MyFavorite data={favorite} />
      {!user.isEmployee ? null : (
        <>
          <MyProducts data={myProducts} />
        </>
      )}
    </div>
  );
};
export default Profile;

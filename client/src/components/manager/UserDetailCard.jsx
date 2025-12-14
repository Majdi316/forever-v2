/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  Button,
  CircularProgress,
  Chip,
  Divider,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-toastify";
import Info from "./Info";
import moment from "moment";
import UserStatusCard from "./UserStatusCard";
import UserMessages from "./UserMessages";

const UserDetailCard = () => {
  const { id: userId } = useParams();
  const {
    backendUrl,
    token,
    titleTheme,
    paragraphTheme,
    paperTheme,
    buttonTheme,
    theme,
  } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${backendUrl}/api/manager/all-users`,
          {
            headers: { "x-auth-token": token },
          }
        );

        const selectedUser = data.users.find((u) => u._id === userId);
        if (selectedUser) {
          setUser(selectedUser);
        } else {
          toast.error("User not found");
        }
        // eslint-disable-next-line no-empty
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);
  const handleUpdate = async () => {
    setUpdating(true);
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/manager/update-status/${userId}`,
        {
          isEmployee: user.isEmployee,
          isBlocked: user.isBlocked,
        },
        { headers: { "x-auth-token": token } }
      );
      //!change the user data state
      setUser(data.user);
      toast.success("User updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setUpdating(false);
    }
  };
  if (loading)
    return (
      <div className="flex justify-center mt-20">
        <CircularProgress />
      </div>
    );
  return (
    <div className=" w-full">
      <div className="max-w-6xl mx-auto p-4">
        <Card sx={paperTheme} className="rounded-2xl shadow-lg">
          <CardContent className="flex flex-col lg:flex-row gap-8">
            {/* LEFT – Avatar */}
            <div className="flex flex-col items-center lg:w-1/3">
              <img
                src={user?.image?.url}
                alt={user?.image?.alt}
                className="w-48 h-48 rounded-full object-cover border-4 border-gray-200"
              />

              {/* Status Chips */}
              <div className="flex gap-2 mt-4 flex-wrap justify-center">
                {user?.isManager && (
                  <Chip label="Manager" color="success" size="small" />
                )}
                {user?.isEmployee && (
                  <Chip label="Employee" color="warning" size="small" />
                )}
                {user?.isVerified && (
                  <Chip label="Verified" color="primary" size="small" />
                )}
                {user?.isBlocked && (
                  <Chip label="Blocked" color="error" size="small" />
                )}
              </div>
            </div>

            {/* RIGHT – User Info */}
            <div className="flex-1 space-y-4">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <Typography style={titleTheme} variant="h5" fontWeight="bold">
                  {user?.name?.first} {user?.name?.middle} {user?.name?.last}
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ fontWeight: "bold" }}
                >
                  DELETE
                </Button>
              </div>

              <Typography style={paragraphTheme}>{user?.email}</Typography>

              <Divider
                sx={{
                  bgcolor: theme === "dark" ? "white" : "black",
                  marginTop: "15px",
                  marginBottom: "15px",
                }}
              />

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <Info
                  titleTheme={titleTheme}
                  label="Gender"
                  value={user?.gender}
                />
                <Info titleTheme={titleTheme} label="Age" value={user?.age} />
                <Info
                  titleTheme={titleTheme}
                  label="Phone"
                  value={user?.phone}
                />
                <Info
                  titleTheme={titleTheme}
                  label="City"
                  value={user?.address?.city}
                />
                <Info
                  titleTheme={titleTheme}
                  label="Street"
                  value={user?.address?.street}
                />
                <Info
                  titleTheme={titleTheme}
                  label="State"
                  value={user?.address?.state}
                />
                <Info
                  titleTheme={titleTheme}
                  label="Country"
                  value={user?.address?.country}
                />
                <Info
                  titleTheme={titleTheme}
                  label="Zip"
                  value={user?.address?.zip}
                />
                <Info
                  titleTheme={titleTheme}
                  label="House #"
                  value={user?.address?.houseNumber}
                />
                <Info
                  titleTheme={titleTheme}
                  label="Likes #"
                  value={user?.likesCount}
                />
                <Info
                  titleTheme={titleTheme}
                  label="Cart #"
                  value={Object.keys(user?.cartData ?? {}).length}
                />
                <Info
                  titleTheme={titleTheme}
                  label="Created At"
                  value={new Date(user?.createdAt).toLocaleString()}
                />
                <Info
                  titleTheme={titleTheme}
                  label="Last Activity"
                  value={
                    user.lastActivity
                      ? moment(user.lastActivity).fromNow()
                      : "N/A"
                  }
                />
                <Info
                  titleTheme={titleTheme}
                  label="Last Login"
                  value={
                    user.lastActivity ? moment(user.lastLogin).fromNow() : "N/A"
                  }
                />
              </div>

              <Divider sx={{ bgcolor: theme === "dark" ? "white" : "black" }} />
              {/* Controls */}
              <div className="flex flex-col sm:flex-row gap-6">
                <FormControlLabel
                  control={
                    <Switch
                      checked={user?.isEmployee}
                      onChange={(e) =>
                        setUser({ ...user, isEmployee: e.target.checked })
                      }
                    />
                  }
                  label="Employee"
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={user?.isBlocked}
                      onChange={(e) =>
                        setUser({ ...user, isBlocked: e.target.checked })
                      }
                    />
                  }
                  label="Blocked"
                />
              </div>

              <Button
                onClick={handleUpdate}
                disabled={updating}
                variant="contained"
                fullWidth
                sx={{ ...buttonTheme, mt: 2 }}
              >
                {updating ? <CircularProgress size={24} /> : "Update User"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <UserStatusCard user={user} />
      <UserMessages userId={user?._id} />
    </div>
  );
};

export default UserDetailCard;

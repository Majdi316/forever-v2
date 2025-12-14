//TODO Libraries
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
//TODO MUI Components
import { Avatar, Chip, TextField, CircularProgress } from "@mui/material";
//TODO Context
import { UserContext } from "../../context/UserContext";
//TODO Theme
import { customTextFieldStyles } from "../../helper/styeTextInput";
import { DARK_MODE, LIGHT_MODE } from "../../theme/themeData";
//TODO Components
import Stat from "./Stat";
//TODO Main Component
export default function AdminUsersTable() {
  //TODO Variables
  const { backendUrl, token, titleTheme, paperTheme, theme, navigate } =
    useContext(UserContext);
  //TODO States
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  //TODO Functions
  const fetchUsers = async (p = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/manager/all-users`, {
        params: { page: p, limit: 100, search },
        headers: { "x-auth-token": token },
      });

      setUsers(data.users);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  //TODO useEffect
  useEffect(() => {
    fetchUsers(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //TODO Return
  return (
    <div className="p-4 md:p-6 w-full">
      <div className=" w-full flex flex-col md:flex-row justify-between gap-3 mb-5">
        <h2 style={titleTheme} className="text-2xl font-semibold">
          Users Overview
        </h2>

        <TextField
          sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
          size="small"
          placeholder="Search by name, email, or city"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchUsers(1)}
          className="w-full md:w-72"
        />
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-10">
          <CircularProgress />
        </div>
      )}

      {/* Users Grid */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {users.map((user) => (
            <div
              onClick={() => {
                navigate(`/manager/user-details/${user._id}`);
              }}
              style={paperTheme}
              key={user._id}
              className="rounded-xl shadow p-4 hover:shadow-lg hover:scale-105 transition cursor-pointer"
            >
              {/* User Header */}
              <div className="flex items-center gap-3 mb-4">
                <Avatar src={user.image?.url} />
                <div>
                  <div style={titleTheme} className="font-semibold capitalize">
                    {user.name?.first} {user.name?.last}
                  </div>
                  <div className="text-xs ">{user.email}</div>
                  <div className="text-xs ">{user.address?.city}</div>
                </div>
              </div>

              {/* Badges */}
              <div className="flex gap-2 mb-3 flex-wrap">
                {user.isManager && (
                  <Chip
                    sx={{ bgcolor: "green", color: "white", opacity: 0.7 }}
                    size="small"
                    label="Manager"
                  />
                )}
                {user.isEmployee && (
                  <Chip
                    sx={{ bgcolor: "orange", color: "white", opacity: 0.7 }}
                    size="small"
                    label="Employee"
                  />
                )}
                {user.isVerified && (
                  <Chip
                    sx={{ bgcolor: "blue", color: "white", opacity: 0.7 }}
                    size="small"
                    label="Verified"
                  />
                )}
                {user.isBlocked && (
                  <Chip size="small" label="Blocked" color="error" />
                )}
              </div>
              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <Stat label="Products" value={user.employeeProductsCount} />
                <Stat label="Reviews" value={user.reviewsCount} />
                <Stat label="Likes" value={user.likesCount} />
                <Stat label="Orders" value={user.ordersCount} />
                <Stat label="Spent" value={`$${user.ordersTotalAmount}`} />
                <Stat
                  label="Contacts"
                  value={`${user.contacts?.answered}/${user.contacts?.unAnswered}`}
                />
              </div>

              {/* Footer */}
              <div
                style={{ color: DARK_MODE.Accent }}
                className="mt-4 text-xs "
              >
                Last active:{" "}
                {user.lastActivity
                  ? moment(user.lastActivity).fromNow()
                  : "N/A"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

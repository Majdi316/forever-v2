//TODO Libraries
import { useEffect, useState, useContext } from "react";
import axios from "axios";
//TODO MUI Components
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  CircularProgress,
} from "@mui/material";
//TODO Context
import { UserContext } from "../../context/UserContext";
//TODO Main Component
const TopActiveUsers = () => {
  //TODO Variables
  const { backendUrl, token, titleTheme, paperTheme } = useContext(UserContext);
  //TODO States
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  //TODO useEffects
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(
          `${backendUrl}/api/manager/top-active-users`,
          { headers: { "x-auth-token": token } }
        );
        setUsers(data.users);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backendUrl]);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <CircularProgress />
      </div>
    );
  }
  //TODO Return
  return (
    <div className="w-full">
      <p style={titleTheme} className=" text-2xl mt-5 mb-5">
        🔥 High 5 Engagement Users{" "}
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {users.map((user) => (
          <div
            className=" cursor-pointer hover:scale-110"
            onClick={() => {}}
            key={user._id}
          >
            <Card
              sx={paperTheme}
              key={user._id}
              className="hover:shadow-xl transition duration-300 rounded-2xl"
            >
              <CardContent className="flex flex-col items-center text-center gap-3">
                <Avatar
                  src={user.image?.url}
                  alt={user.image?.alt}
                  sx={{ width: 80, height: 80 }}
                />

                <Typography sx={titleTheme} variant="h6" className="capitalize">
                  {user.name.first} {user.name.middle} {user.name.last}
                </Typography>

                <Typography variant="body2">{user.email}</Typography>

                <div className="text-xs space-y-1">
                  <p>
                    <span style={titleTheme}>Last Login: </span>
                    <span className="font-semibold">
                      {new Date(user.lastLogin).toLocaleString()}
                    </span>
                  </p>
                  <p>
                    <span style={titleTheme}>Last Activity: </span>
                    <span className="font-semibold">
                      {new Date(user.lastActivity).toLocaleString()}
                    </span>
                  </p>
                </div>

                <Chip
                  label={user.isEmployee ? "Employee" : "Customer"}
                  color={user.isEmployee ? "success" : "info"}
                  className="mt-2"
                />
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopActiveUsers;

import { Card, CardContent, Typography, Divider } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

// eslint-disable-next-line no-unused-vars
const RoleCard = ({ icon: Icon, title, description, permissions }) => {
  const { titleTheme, paperTheme, theme } = useContext(UserContext);
  return (
    <Card
      sx={paperTheme}
      className="h-full shadow-md hover:shadow-xl transition rounded-2xl"
    >
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Icon className="w-7 h-7 text-indigo-600" />
          <Typography sx={titleTheme} variant="h6" className="font-semibold">
            {title}
          </Typography>
        </div>

        <Typography variant="body2">{description}</Typography>

        <Divider sx={{ bgcolor: theme === "dark" ? "white" : "" }} />

        <ul className="list-disc pl-5 space-y-1 text-sm ">
          {permissions.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default RoleCard;

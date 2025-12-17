//TODO Libraries
import { useContext } from "react";
//TODO MUI Components
import { Typography, Container } from "@mui/material";
//TODO Icons
import { Eye, User, Briefcase, ShieldCheck } from "lucide-react";
//TODO External Components
import RoleCard from "../components/RoleCard";
//TODO Context
import { UserContext } from "../context/UserContext";
//TODO Main Component
const About = () => {
  //TODO Variables
  const { titleTheme, paragraphTheme } = useContext(UserContext);
  //TODO Return
  return (
    <Container maxWidth="xl" className="py-10">
      {/* Header */}
      <div className="text-center mb-12">
        <Typography sx={titleTheme} variant="h4" className="font-bold mb-3">
          Forever-V2 — System Overview
        </Typography>
        <Typography sx={paragraphTheme} className=" max-w-3xl mx-auto">
          Forever-V2 is a modern e-commerce fashion platform with scalable user
          management, role-based access control, and powerful administrative
          tools.
        </Typography>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <RoleCard
          icon={Eye}
          title="Visitor"
          description="Public users without authentication."
          permissions={[
            "View products & categories",
            "Search and filter collections",
            "View product details",
          ]}
        />

        <RoleCard
          icon={User}
          title="User (Customer)"
          description="Authenticated shoppers using the platform."
          permissions={[
            "Add to cart & wishlist",
            "Place & track orders",
            "Manage profile & addresses",
            "Submit reviews & ratings",
            "Subscribe & Get Exclusive Offers 🎁",
            "Users have the ability to like products.",
            "Users can communicate with the manager without intermediaries.",
          ]}
        />
        <RoleCard
          icon={Briefcase}
          title="Employee"
          description="Operational staff with limited admin access."
          permissions={[
            "Manage products & stock",
            "Update order statuses",
            "View customer info (read-only)",
            "Moderate reviews & support",
          ]}
        />

        <RoleCard
          icon={ShieldCheck}
          title="Manager"
          description="Full system administrators."
          permissions={[
            "Manage users & employees",
            "View sales analytics",
            "Configure system settings",
            "Approve or remove products & reviews & messages",
            "Managers can manage user access by blocking accounts & delete it. ",
          ]}
        />
      </div>

      {/* Features */}
      <div className="mt-14">
        <Typography sx={titleTheme} variant="h5" className="font-semibold mb-4">
          Key System Features
        </Typography>

        <ul
          style={paragraphTheme}
          className="grid grid-cols-1 md:grid-cols-2 gap-3  list-disc pl-6"
        >
          <li>Role-based access control (RBAC)</li>
          <li>Secure authentication & authorization</li>
          <li>Modular and scalable architecture</li>
          <li>Centralized management dashboard</li>
          <li>Optimized for large product catalogs</li>
        </ul>
      </div>
    </Container>
  );
};

export default About;

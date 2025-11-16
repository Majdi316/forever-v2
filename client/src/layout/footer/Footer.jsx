//TODO Libraries
import { useContext } from "react";
import { Link } from "react-router-dom";
//TODO Context
import { UserContext } from "../../context/UserContext";
//TODO Theme Data
import { DARK_MODE, LIGHT_MODE } from "../../theme/themeData";
//TODO Icons
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
//TODO Main Function
const Footer = () => {
  //TODO Variables
  const { theme } = useContext(UserContext);
  //TODO Return
  return (
    <div
      style={{
        background: theme === "dark" ? DARK_MODE.Primary : LIGHT_MODE.Primary,
        color: "white",
      }}
      className="px-5 md:px-10 lg:px-20 pt-10 pb-5"
    >
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-5 text-sm">
        <div>
          <p className="appBarLogo">
            For<span>ever</span>-V2{" "}
          </p>
          <p className="w-full md:w-2/3 mt-4 font-bold text-l">
            🖤 Forever – Modern Fashion for Everyone
          </p>
          <p className="w-full md:w-2/3 mt-4">
            Welcome to Forever, your ultimate online destination for modern
            fashion. We bring you the latest styles, timeless essentials, and
            trend-forward outfits for men, women, and kids. From casual everyday
            looks to standout pieces, Forever is all about confidence, comfort,
            and contemporary style — designed for everyone, made for you.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul
            style={{ color: DARK_MODE.Accent }}
            className="flex flex-col gap-1"
          >
            <li className=" cursor-pointer font-bold">
              <Link to="/">Home</Link>
            </li>
            <li className=" cursor-pointer font-bold">
              <Link to="/about">About us</Link>
            </li>
            <li className=" cursor-pointer font-bold">
              <Link to="/contact">Contact us</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1">
            <li>
              {" "}
              <PhoneIcon
                style={{
                  fontSize: "18px",
                  verticalAlign: "middle",
                  marginRight: "5px",
                }}
              />
              0556609514
            </li>
            <li>
              <EmailIcon
                style={{
                  fontSize: "18px",
                  verticalAlign: "middle",
                  marginRight: "5px",
                }}
              />
              majdioa7sh@gmail.com
            </li>
            <li>
              <LinkedInIcon
                style={{
                  fontSize: "18px",
                  verticalAlign: "middle",
                  marginRight: "5px",
                }}
              />
              <a
                href="https://www.linkedin.com/in/majdi-hoseen-45ba21235"
                target="_blank"
                rel="noreferrer"
              >
                Majdi Hoseen
              </a>
            </li>
            <li>
              <GitHubIcon
                style={{
                  fontSize: "18px",
                  verticalAlign: "middle",
                  marginRight: "5px",
                }}
              />
              <a
                href="https://github.com/Majdi316"
                target="_blank"
                rel="noreferrer"
              >
                Majdi316
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-center text-sm">
          Copyright 2025 @ majdi hoseen - All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;

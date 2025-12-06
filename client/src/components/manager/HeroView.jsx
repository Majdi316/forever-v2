//TODO Libraries
import { useContext } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
//TODO Context
import { UserContext } from "../../context/UserContext";
//TODO MUI Components
import { Button, CircularProgress, Divider } from "@mui/material";
//TODO Main Component
const HeroView = () => {
  //TODO Variables
  const {
    paragraphTheme,
    theme,
    backendUrl,
    titleTheme,
    paperTheme,
    buttonTheme,
    navigate,
  } = useContext(UserContext);
  //TODO States
  const [hero, setHero] = useState([]);
  const [loading, setLoading] = useState(false);

  //TODO Functions
  const fetchHeroDataFromDb = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/hero`);
      if (data.success) {
        setHero(data.hero);
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
    fetchHeroDataFromDb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //TODO Return
  return (
    <div className="p-6 w-full h-full">
      <Divider
        sx={{
          bgcolor: theme === "dark" ? "white" : "black",
          marginTop: "15px",
          marginBottom: "15px",
        }}
      />

      <div className="mb-6">
        <p style={paragraphTheme}>Hero View</p>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center mt-20">
          <CircularProgress />
        </div>
      ) : hero.length === 0 ? (
        /* EMPTY STATE */
        <div
          style={paperTheme}
          className="w-full p-10 rounded-xl flex flex-col items-center justify-center gap-6 text-center"
        >
          <p className="text-gray-500 text-lg">No Hero Section Found</p>

          <Button
            sx={buttonTheme}
            onClick={() => navigate("/manager/create-hero-section")}
          >
            CREATE HERO SECTION
          </Button>
        </div>
      ) : (
        <div
          style={paperTheme}
          className="w-full p-5 items-center justify-center flex flex-col-reverse sm:flex-row gap-5 rounded-xl"
        >
          {/* Content */}
          <div className="w-full flex flex-col items-start sm:items-center gap-10 text-xl">
            <p>{hero[0]?.subTitle}</p>

            <p style={titleTheme} className="font-bold text-3xl">
              {hero[0]?.title}
            </p>

            <p>{hero[0]?.description}</p>
          </div>

          {/* Image */}
          <div className="w-full relative">
            <img
              style={{ borderRadius: "15px" }}
              className="w-full h-[300px] object-cover"
              src={hero[0]?.image?.url}
              alt={hero[0]?.image?.alt}
            />

            <div className="absolute top-3 right-3">
              <Button
                onClick={() =>
                  navigate(`/manager/update-hero-section/${hero[0]?._id}`)
                }
                sx={buttonTheme}
              >
                UPDATE
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroView;

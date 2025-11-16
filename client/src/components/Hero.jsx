//TODO Libraries
import { useContext } from "react";
import { useState, useEffect } from "react";
//TODO Global Variables
import { UserContext } from "../context/UserContext";
import { assets } from "../assets/assets";
//TODO Function
import { fetchHeroData } from "../helper/api";
//TODO Theme
import { DARK_MODE, LIGHT_MODE } from "../theme/themeData";
//TODO Main Function
const Hero = () => {
  //TODO Variables
  const { theme, backendUrl } = useContext(UserContext);
  //TODO States
  const [hero, setHero] = useState([]);
  //TODO Functions
  const fetchHeroDataFromDb = async () => {
    const result = await fetchHeroData(backendUrl);
    setHero(result);
  };
  //TODO useEffect
  useEffect(() => {
    fetchHeroDataFromDb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //TODO Return
  // ------------ initial hero section -----------
  if (!hero || hero.length === 0) {
    return (
      <div
       style={{
          background: theme === "dark" ? DARK_MODE.Paper : LIGHT_MODE.Paper,
          borderRadius: "15px",
          boxShadow: theme === "dark" ? "0 7px 12px rgba(0, 0, 0, 0.5)" : "0 7px 12px rgba(0, 0, 0, 0.1)",
        }}
        className="flex flex-col sm:flex-row w-full"
      >
        {/* Hero Left Side */}
        <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 ">
          <div
            style={{
              color:
                theme === "dark"
                  ? DARK_MODE.TextSecondary
                  : LIGHT_MODE.TextSecondary,
            }}
          >
            <div className="flex items-center gap-2">
              <p
                style={{
                  background:
                    theme === "dark"
                      ? DARK_MODE.TextSecondary
                      : LIGHT_MODE.TextSecondary,
                }}
                className="w-8 md:w-11 h-[2px]"
              ></p>
              <p className="font-medium text-sm md:text-base">
                OUR BEST SELLER
              </p>
            </div>
            <h1
              style={{
                color:
                  theme === "dark"
                    ? DARK_MODE.TextPrimary
                    : LIGHT_MODE.TextPrimary,
              }}
              className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed"
            >
              Latest Arrivals
            </h1>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
              <p
                style={{
                  background:
                    theme === "dark"
                      ? DARK_MODE.TextSecondary
                      : LIGHT_MODE.TextSecondary,
                }}
                className="w-8 md:w-11 h-[1px]"
              ></p>
            </div>
          </div>
        </div>
        {/* Hero Right Side */}
        <img style={{borderRadius:"15px"}}
          className="w-full sm:w-1/2 h-[400px]"
          src={assets.hero_img}
          alt="hero image"
        />
      </div>
    );
    // ------------- get hero from DB ---------
  } else {
    return (
      <div
        style={{
          background: theme === "dark" ? DARK_MODE.Paper : LIGHT_MODE.Paper,
          borderRadius: "15px",
          boxShadow: theme === "dark" ? "0 7px 12px rgba(0, 0, 0, 0.5)" : "0 7px 12px rgba(0, 0, 0, 0.1)",
        }}
        className="flex flex-col sm:flex-row w-full"
      >
        {/* Hero Left Side */}
        <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 ">
          <div
            style={{
              color:
                theme === "dark"
                  ? DARK_MODE.TextSecondary
                  : LIGHT_MODE.TextSecondary,
            }}
          >
            <div className="flex items-center gap-2">
              <p
                style={{
                  background:
                    theme === "dark"
                      ? DARK_MODE.TextSecondary
                      : LIGHT_MODE.TextSecondary,
                }}
                className="w-8 md:w-11 h-[2px]"
              ></p>
              <p className="font-medium text-sm md:text-base">
                {hero[0]?.subTitle}
              </p>
            </div>
            <h1
              style={{
                color:
                  theme === "dark"
                    ? DARK_MODE.TextPrimary
                    : LIGHT_MODE.TextPrimary,
              }}
              className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed"
            >
              {hero[0]?.title}
            </h1>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-sm md:text-base">
                {hero[0]?.description}
              </p>
              <p
                style={{
                  background:
                    theme === "dark"
                      ? DARK_MODE.TextSecondary
                      : LIGHT_MODE.TextSecondary,
                }}
                className="w-8 md:w-11 h-[1px]"
              ></p>
            </div>
          </div>
        </div>
        {/* Hero Right Side */}
        <img style={{borderRadius:"15px"}}
          className="w-full sm:w-1/2 h-[400px]"
          src={hero[0]?.image.url}
          alt={hero[0]?.image.alt}
        />
      </div>
    );
  }
};

export default Hero;

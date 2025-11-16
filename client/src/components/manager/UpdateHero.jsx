//TODO Libraries
import { useContext, useEffect, useState } from "react";
//TODO Global Variables
import { UserContext } from "../../context/UserContext";
//TODO Function
import { fetchHeroData } from "../../helper/api";

//TODO Main Function
const UpdateHero = () => {
  //TODO Variables
  const { backendUrl, navigate } = useContext(UserContext);
  //TODO States
  const [hero, setHero] = useState([]);
  //TODO Function
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
  if (!hero || hero.length === 0) {
    return (
      <div>
        <h1>Not found any hero section .....</h1>
        <h2>create new hero section ......</h2>
        <button onClick={()=>navigate("/manager/create-hero-section")}>Create</button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Hero Section</h1>
        <p>title : {hero[0].title}</p>
        <p>subTitle : {hero[0].subTitle}</p>
        <p>description : {hero[0].description}</p>
        <img src={hero[0].image.url} alt={hero[0].image.alt} width={200} />
        <p>alt: {hero[0].image.alt} </p>
        <button
          onClick={() => {
            navigate(`/manager/update-hero-section/${hero[0]._id}`);
          }}
        >
          update
        </button>
      </div>
    );
  }
};

export default UpdateHero;

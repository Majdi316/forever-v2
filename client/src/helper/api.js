import axios from "axios";
//todo---------- grt hero section data --------
const fetchHeroData = async (backendUrl) => {
  try {
    const res = await axios.get(backendUrl + "/api/hero");
    if (res.data.success) {
      return res.data.hero;
    }
    // eslint-disable-next-line no-unused-vars, no-empty
  } catch (error) {}
};

export { fetchHeroData };

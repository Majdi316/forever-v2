//TODO Libraries
import { jwtDecode } from "jwt-decode";

export const getToken = () => localStorage.getItem("token");

export const getUser = () => {
  try {
    const myToken = getToken();
    return jwtDecode(myToken);
  // eslint-disable-next-line no-unused-vars
  } catch (err) {
    return null;
  }
};

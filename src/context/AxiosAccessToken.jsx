import { useEffect } from "react";
import axios from "axios";

const AxiosAccessToken = () => {
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      axios.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
    } else {
      delete axios.defaults.headers["Authorization"];
    }
  }, []);
  return null;
};

export default AxiosAccessToken;

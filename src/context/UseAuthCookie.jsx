import { useEffect } from "react";
import Cookies from "js-cookie";
import { useAuth } from "../context/AuthContext";

export default function useAuthCookie() {
  const { setIsLoggedIn } = useAuth();

  // Function to start the logout timer
  const setLogoutTimer = () => {
    setTimeout(() => {
      logoutCookie();
    }, 30 * 60 * 1000); // 30 minutes
  };

  // Login function (stores login state in a cookie)
  const loginCookie = () => {
    setIsLoggedIn(true);
    Cookies.set("loggedIn", "true", { expires: 1 / 48 }); // 30-minute expiration
    setLogoutTimer();
  };

  // Logout function (removes login state)
  const logoutCookie = () => {
    setIsLoggedIn(false);
    Cookies.remove("loggedIn");
  };

  useEffect(() => {
    const storedLogin = Cookies.get("loggedIn");
    if (storedLogin === "true") {
      setIsLoggedIn(true);
      setLogoutTimer();
    } else {
      setIsLoggedIn(false);
    }
  }, [setIsLoggedIn]);

  return { loginCookie, logoutCookie };
}

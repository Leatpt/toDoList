import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuthCookie from "../../context/useAuthCookie";

export default function Logout() {
  const navigate = useNavigate();
  const { logoutCookie } = useAuthCookie();

  useEffect(() => {
    localStorage.removeItem("access_token");
    logoutCookie();
    navigate("/login");
  }, [navigate, setIsLoggedIn]);

  return null;
}

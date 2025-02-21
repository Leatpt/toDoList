import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

export default function Logout() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  useEffect(() => {
    localStorage.removeItem("authToken");

    setIsLoggedIn(false);

    navigate("/login");
  }, [navigate, setIsLoggedIn]);

  return null;
}

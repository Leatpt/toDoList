import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function LoginLogoutButton({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false); // Log out
      navigate("/logout");
    } else {
      navigate("/login"); // Navigate to the login page
    }
  };

  return (
    <Button onClick={handleLoginLogout}>
      {isLoggedIn ? "Login" : "Logout"}
    </Button>
  );
}

import { BrowserRouter, Route, Routes } from "react-router";
import TaskList from "./components/views/TaskList";
import Login from "./components/views/Login";
import Logout from "./components/views/Logout";
import { AuthProvider } from "./context/AuthContext";
import { useState, useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
//import 'antd/dist/antd.css';
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <TaskList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

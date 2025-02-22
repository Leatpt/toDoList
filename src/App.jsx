import { BrowserRouter, Route, Routes } from "react-router";
import TaskList from "./components/views/TaskList";
import Login from "./components/views/Login";
import Register from "./components/views/Register";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AxiosAccessToken from "./context/AxiosAccessToken";
//import 'antd/dist/antd.css';
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AxiosAccessToken />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <TaskList />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

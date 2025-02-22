import { Form, Input, Button, Row, Col, notification } from "antd";
import { useNavigate } from "react-router";
import useAuthCookie from "../../context/useAuthCookie";
import axios from "axios";

const API_URL_USERS_TOKEN =
  "https://cors-anywhere.herokuapp.com/http://demo2.z-bit.ee/users/get-token";

export default function Login() {
  const navigate = useNavigate();
  const { loginCookie } = useAuthCookie();

  const onFinish = async (values) => {
    const { username, password } = values;

    try {
      const response = await axios.post(API_URL_USERS_TOKEN, {
        username: username,
        password: password,
      });
      console.log(response);

      if (response.status === 200) {
        const { access_token } = response.data;

        if (access_token) {
          localStorage.setItem("access_token", access_token);

          loginCookie();

          notification.success({
            message: "Logged in",
          });
          navigate("/");
        } else {
          notification.error({
            message: "Login Failed",
            description: "Access token was not returned. Please try again.",
          });
        }
      } else {
        notification.error({
          message: "Login Failed",
          description:
            response.data.message || "An error occurred during login.",
        });
      }
    } catch (error) {
      if (error.response) {
        notification.error({
          message: "Login Failed",
          description: error.response.data.message || "An error occurred.",
        });
      } else {
        notification.error({
          message: "Login Failed",
          description: "An error occurred. Please try again later.",
        });
      }
    }
  };
  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ minHeight: "100vh" }}
    >
      <Col span={4}>
        <h1>Login</h1>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ username: "", password: "" }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Row justify="start">
              <Col>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Col>
              <Col>
                <Button
                  type="primary"
                  onClick={handleRegisterClick}
                  style={{ marginLeft: "8px" }}
                >
                  Register
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

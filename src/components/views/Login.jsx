import { Form, Input, Button, Row, Col, notification } from "antd";
import { useNavigate } from "react-router";
import useAuthCookie from "../../context/useAuthCookie";

export default function Login() {
  const navigate = useNavigate();
  const { loginCookie } = useAuthCookie();

  const onFinish = (values) => {
    const hardcodedUsername = "leatpt";
    const hardcodedPassword = "hajusrakendus";
    const hardcodedAccessToken = "c8n-fyvDWIOEzXNC-OQ6NPLRi_kJ6jGC";

    if (
      values.username === hardcodedUsername &&
      values.password === hardcodedPassword
    ) {
      notification.success({
        message: "Logged in",
      });

      localStorage.setItem("access_token", hardcodedAccessToken);
      loginCookie();
      navigate("/");
    } else {
      notification.error({
        message: "Wrong username or password",
      });
    }
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
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginLeft: "8px" }}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

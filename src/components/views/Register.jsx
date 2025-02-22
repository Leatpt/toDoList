// Register.jsx
import { Form, Input, Button, Row, Col, notification } from "antd";
import { useNavigate } from "react-router-dom"; // Use react-router-dom to navigate
import { useEffect } from "react"; // To clear form values on mount

export default function Register() {
  const navigate = useNavigate();

  const onFinish = (values) => {
    notification.success({
      message: "Registration Successful",
    });

    navigate("/login");
  };

  useEffect(() => {}, []);

  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ minHeight: "100vh" }}
    >
      <Col span={4}>
        <h1>Register</h1>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{
            username: "",
            password: "",
            firstname: "",
            lastname: "",
          }}
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
            label="First name"
            name="firstname"
            rules={[
              { required: true, message: "Please input your firstname!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last name"
            name="lastname"
            rules={[{ required: true, message: "Please input your lastname!" }]}
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
              Register
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

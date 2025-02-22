import { Form, Input, Button, Row, Col, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const API_URL_USERS =
  "https://cors-anywhere.herokuapp.com/http://demo2.z-bit.ee/users";

export default function Register() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const { username, newPassword, firstname, lastname } = values;

    try {
      const response = await axios.post(API_URL_USERS, {
        username: username,
        newPassword: newPassword,
        firstname: firstname,
        lastname: lastname,
      });

      if (response.status === 201) {
        const { access_token } = response.data;

        if (access_token) {
          localStorage.setItem("access_token", access_token);
          notification.success({
            message: "Registration Successful",
          });

          navigate("/login");
        } else {
          notification.error({
            message: "Registration Failed",
            description: "Access token was not returned. Please try again.",
          });
        }
      } else {
        notification.error({
          message: "Registration Failed",
          description:
            response.data.message || "An error occurred during registration.",
        });
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        notification.error({
          message: "Registration Failed",
          description: error.response.data.message || "An error occurred.",
        });
      } else {
        notification.error({
          message: "Registration Failed",
          description: "An error occurred. Please try again later.",
        });
      }
    }
  };

  useEffect(() => {
    form.resetFields();
  }, [form]);

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
          form={form}
          name="register-form"
          layout="vertical"
          autoComplete="new-password"
          initialValues={{
            username: "",
            newPassword: "",
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
            <Input autoComplete="off" />
          </Form.Item>

          <Form.Item
            label="First name"
            name="firstname"
            rules={[
              { required: true, message: "Please input your firstname!" },
            ]}
          >
            <Input autoComplete="off" />
          </Form.Item>

          <Form.Item
            label="Last name"
            name="lastname"
            rules={[{ required: true, message: "Please input your lastname!" }]}
          >
            <Input autoComplete="off" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="newPassword"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password autoComplete="new-password" />
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

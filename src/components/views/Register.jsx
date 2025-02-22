import { Form, Input, Button, Row, Col, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    notification.success({
      message: "Registration Successful",
    });

    navigate("/login");
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
            name="password"
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

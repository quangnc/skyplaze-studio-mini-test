import React from "react";
import { Row, Col, Input, Button } from "antd";
import { useHistory } from "react-router-dom";
import { useForm, useFormErrors } from "../components/useForm";
import { isEmpty } from "lodash";

function LoginComponent() {
  let history = useHistory();
  const [values, handleChange] = useForm({ email: "", password: "" });
  const [errors, handleErrors] = useFormErrors({
    email: "",
    password: "",
  });

  const checkFromData = () => {
    let count = 0;
    const fromErrors = { ...errors };
    const patternVerify = /^[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/;

    if (isEmpty(values.email)) {
      fromErrors.email = "Email is required";
      count++;
    }

    if (!isEmpty(values.email) && !patternVerify.test(values.email)) {
      fromErrors.email = "Please use a valid email address.";
      count++;
    }

    if (isEmpty(values.password)) {
      fromErrors.password = "Password is required";
      count++;
    }

    handleErrors(fromErrors);
    return count;
  };

  const handleLogin = () => {
    const count = checkFromData();
    if (count > 0) {
      return;
    }

    localStorage.setItem("logged", true);
    history.push("/");
  };

  const onChangeData = (e) => {
    const errorNew = { ...errors, [e.target.name]: "" };
    handleChange(e);
    handleErrors(errorNew);
  };

  return (
    <div style={{ height: "100vh" }}>
      <div
        style={{
          position: "relative",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <Row justify="center" align="middle" gutter={[24, 24]}>
          <Col span={3}>Email</Col>
          <Col span={4}>
            <Input name="email" value={values.email} onChange={onChangeData} />
            {errors.email !== "" && (
              <p style={{ color: "red" }}>{errors.email}</p>
            )}
          </Col>
        </Row>
        <Row justify="center" align="middle" gutter={[24, 24]}>
          <Col span={3}>Password</Col>
          <Col span={4}>
            <Input
              type="password"
              name="password"
              value={values.password}
              onChange={onChangeData}
            />
            {errors.password !== "" && (
              <p style={{ color: "red" }}>{errors.password}</p>
            )}
          </Col>
        </Row>
        <Row justify="center" align="middle" gutter={[24, 24]}>
          <Col span={3}>
            <Button block onClick={handleLogin}>
              Login
            </Button>
          </Col>
          <Col span={3}>
            <Button block onClick={() => history.push("/register")}>
              Register
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}

LoginComponent.propTypes = {};

export default LoginComponent;

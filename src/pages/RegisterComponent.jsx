import React from "react";
import { Row, Col, Input, Button, Modal } from "antd";
import { useHistory } from "react-router-dom";
import { useForm, useFormErrors } from "../components/useForm";
import { isEmpty } from "lodash";

function RegisterComponent(props) {
  let history = useHistory();
  const [values, handleChange] = useForm({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [errors, handleErrors] = useFormErrors({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const checkFromData = () => {
    let count = 0;
    const fromErrors = { ...errors };
    const patternVerify = /^[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/;

    if (isEmpty(values.name)) {
      fromErrors.name = "Name is required";
      count++;
    }

    if (isEmpty(values.phone)) {
      fromErrors.phone = "Phone is required";
      count++;
    }

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

  const handleSubmit = (e) => {
    const count = checkFromData();
    if (count > 0) {
      return;
    }
    Modal.confirm({
      title: "Account registration confirmation?",
      okText: "Submit",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        history.push("/login");
      },
      onCancel() {},
    });
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
        <Row justify="center" align="middle" gutter={[16, 16]}>
          <Col span={3}>UserName</Col>
          <Col span={4}>
            <Input name="name" value={values.name} onChange={onChangeData} />
            {errors.name !== "" && (
              <p style={{ color: "red" }}>{errors.name}</p>
            )}
          </Col>
        </Row>
        <Row justify="center" align="middle" gutter={[16, 16]}>
          <Col span={3}>Phone</Col>
          <Col span={4}>
            <Input
              type="number"
              min={1}
              max={10}
              name="phone"
              value={values.phone}
              onChange={onChangeData}
            />
            {errors.phone !== "" && (
              <p style={{ color: "red" }}>{errors.phone}</p>
            )}
          </Col>
        </Row>
        <Row justify="center" align="middle" gutter={[16, 16]}>
          <Col span={3}>Email</Col>
          <Col span={4}>
            <Input name="email" value={values.email} onChange={onChangeData} />
            {errors.email !== "" && (
              <p style={{ color: "red" }}>{errors.email}</p>
            )}
          </Col>
        </Row>
        <Row justify="center" align="middle" gutter={[16, 16]}>
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
        <Row justify="center" align="middle" gutter={[16, 16]}>
          <Col span={3}>
            <Button block onClick={handleSubmit}>
              Submit
            </Button>
          </Col>
          <Col span={3}>
            <Button block onClick={() => history.push("/login")}>
              {"<< Login"}
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default RegisterComponent;

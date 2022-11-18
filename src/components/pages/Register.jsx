import React, { useContext, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { signUpSchemas } from "../schemas";
import { default as UUID } from "node-uuid";
import { useNavigate } from "react-router-dom";
import { UserContextAPI } from "./MainHeader";

const initialValues = {
  name: "",
  email: "",
  password: "",
  phone: null,
};

const Register = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(UserContextAPI);
  const [userData, setuserData] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch("http://localhost:8000/users", { signal: signal })
      .then((res) => res.json())
      .then((res) => setuserData(res))
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("successfully aborted");
        } else {
          console.log(err);
        }
      });
    return () => controller.abort();
  }, []);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchemas,
      onSubmit: (value) => {
        const id = UUID.v4();

        const result = JSON.stringify({
          id: id,
          name: value.name,
          email: value.email,
          password: value.password,
          phone: value.phone,
        });

        if (Array.isArray(userData) && !userData.length) {
          fetch("http://localhost:8000/users", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: result,
          })
            .then((res) => {
              localStorage.setItem("userId", id);
              dispatch({ type: "USER", payload: true });
              navigate("/");
            })
            .catch((err) => console.log(err, "something went wrong"));
        } else {
          const checkUsername = (obj) => obj.email === value.email;
          if (userData.some(checkUsername)) {
            dispatch({ type: "USER", payload: false });
            localStorage.removeItem("userId");
            alert("user already exist");
            navigate("/login");
          } else {
            fetch("http://localhost:8000/users", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: result,
            })
              .then((res) => {
                console.log("suceessfully register");
                localStorage.setItem("userId", id);
                dispatch({ type: "USER", payload: true });
                navigate("/");
              })
              .catch((err) => console.log(err, "something went wrong"));
          }
        }
      },
    });

  return (
    <div>
      <Form onSubmit={handleSubmit} className="m-4 ">
        <div className="col-xs-2 form-control">
          <Form.Group className="mb-3 " controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>

            <Form.Control
              type="name"
              autoComplete="off"
              name="name"
              id="name"
              placeholder="Enter your name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {errors.name && touched.name ? (
              <p className="form-error" style={{ color: "red" }}>
                {errors.name}
              </p>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              autoComplete="off"
              name="email"
              id="email"
              placeholder="Enter your email address"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email ? (
              <p className="form-error" style={{ color: "red" }}>
                {errors.email}
              </p>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              autoComplete="off"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password ? (
              <p className="form-error" style={{ color: "red" }}>
                {errors.password}
              </p>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPhoneNo">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="number"
              autoComplete="off"
              name="phone"
              id="phone"
              placeholder="Enter your phone number"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.phone && touched.phone ? (
              <p className="form-error" style={{ color: "red" }}>
                {errors.phone}
              </p>
            ) : null}
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Register;

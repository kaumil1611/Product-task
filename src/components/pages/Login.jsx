import React, { useContext, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { signInSchemas } from "../schemas";
import { useNavigate } from "react-router-dom";
import { UserContextAPI } from "./MainHeader";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
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
      validationSchema: signInSchemas,
      onSubmit: (value) => {
        console.log(value);
        if (Array.isArray(userData) && !userData.length) {
          dispatch({ type: "USER", payload: false });
          localStorage.removeItem("userId");
          navigate("/register");
        } else {
          const checkUseremail = (obj) => obj.email === value.email;
          const checkUserPassword = (obj) => obj.password === value.password;
          if (
            userData.some(checkUseremail) &&
            userData.some(checkUserPassword)
          ) {
            console.log("hello");
            dispatch({ type: "USER", payload: true });
            var item = userData.find((item) => item.email === value?.email);
            localStorage.setItem("userId", item?.id);
            navigate("/");
          } else {
            dispatch({ type: "USER", payload: false });
            localStorage.removeItem("userId");
            alert("user Not exist please signup");
            navigate("/register");
          }
        }
      },
    });

  return (
    <div>
      <Form onSubmit={handleSubmit} className="m-4 ">
        <div className="col-xs-2 form-control">
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

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;

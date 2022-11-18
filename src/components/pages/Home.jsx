import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContextAPI } from "./MainHeader";
import { useFormik } from "formik";
import { signUpSchemas } from "../schemas";
const Home = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(UserContextAPI);

  const [userData, setuserData] = useState([]);
  const userID = localStorage.getItem("userId");

  const initialValues = {
    id: "" || userData?.id,
    name: "" || userData?.name,
    email: "" || userData?.email,
    password: "" || userData?.password,
    phone: null || userData?.phone,
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch("http://localhost:8000/users/" + userID, { signal: signal })
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
  }, [userID]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      enableReinitialize: true,
      initialValues: initialValues,
      validationSchema: signUpSchemas,
      onSubmit: (value) => {
        const result = JSON.stringify({
          id: userData?.id,
          name: value.name,
          email: value.email,
          password: value.password,
          phone: value.phone,
        });

        fetch("http://localhost:8000/users/" + userData?.id, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: result,
        })
          .then((res) => {
            dispatch({ type: "USER", payload: false });
            localStorage.removeItem("userId");
            navigate("/login");
          })
          .catch((err) => console.log(err, "something went wrong"));
      },
    });
  return (
    <>
      <h1>Welcome {userData.name}</h1>
      <Button variant="primary" onClick={handleShow}>
        update User Information
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Home;

import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { createUser } from "../utils/API";
import Auth from "../utils/auth";

export default function Signup() {
  const loggedIn = Auth.loggedIn();

  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    setShowAlert(false); // hide alert on typing
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Check if any field is empty
    if (!formState.username || !formState.email || !formState.password) {
      setShowAlert(true);
      return;
    }

    try {
      const response = await createUser(formState);
      if (!response.ok) throw new Error("something went wrong!");
      const { token } = await response.json();
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }
  };

  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="signup d-flex flex-column align-items-center justify-content-center text-center">
      <form onSubmit={handleFormSubmit} className="signup-form d-flex flex-column">
        
        {/* -------------------- Username -------------------- */}
        <label htmlFor="username">Username</label>
        <input
          className="form-input"
          value={formState.username}
          placeholder="Your username"
          name="username"
          type="text"
          onChange={handleChange}
        />
        {showAlert && !formState.username && (
          <small className="text-danger">Username is required</small>
        )}

        {/* -------------------- Email -------------------- */}
        <label htmlFor="email">Email</label>
        <input
          className="form-input"
          value={formState.email}
          placeholder="youremail@gmail.com"
          name="email"
          type="email"
          onChange={handleChange}
        />
        {showAlert && !formState.email && (
          <small className="text-danger">Email is required</small>
        )}

        {/* -------------------- Password -------------------- */}
        <label htmlFor="password">Password</label>
        <input
          className="form-input"
          value={formState.password}
          placeholder="********"
          name="password"
          type="password"
          onChange={handleChange}
        />
        {showAlert && !formState.password && (
          <small className="text-danger">Password is required</small>
        )}

        {/* -------------------- Sign Up Button -------------------- */}
        <div className="btn-div">
          <button
            disabled={!(formState.username && formState.email && formState.password)}
            className="signup-btn mx-auto my-auto"
          >
            Sign Up
          </button>
        </div>

        {/* -------------------- Login Link -------------------- */}
        <p className="link-btn">
          Already have an account?{" "}
          <Link to="/login" className="link-btn-second">Log in</Link>
        </p>

        {/* Server Error Message */}
        {showAlert &&
          formState.username &&
          formState.email &&
          formState.password && (
            <div className="err-message">Signup failed</div>
          )}
      </form>
    </div>
  );
}

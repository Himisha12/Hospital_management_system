import React, { useEffect, useState } from "react";
import styles from "./Register.module.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

function Register() {
  const navigate = useNavigate();

  // USE STATE HOOK
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userType, setUserType] = useState("");
  const [emailError, setEmailError] = useState("");

  const [passwordMatchDisplay, setPasswordMatchDisplay] = useState("none");
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nameRegex = /^[A-Za-z]+$/;
    const usernameRegex = /^[a-zA-Z0-9]{4,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  
    if (!nameRegex.test(firstName)) {
            toast.error("Invalid First Name. Only alphabets allowed.");
            return false;
          }
        
          if (!nameRegex.test(lastName)) {
            toast.error("Invalid Last Name. Only alphabets allowed.");
            return false;
          }
          
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      return;
    } else {
      setEmailError(""); // clear error if valid
    }
    if (!usernameRegex.test(username)) {
      toast.error("Username must be 4-16 characters (letters, numbers, underscore)");
      return;
    }
  
    if (!passwordRegex.test(password)) {
      toast.error("Password must have at least 6 characters, 1 number, 1 uppercase");
      return;
    }

    let user = {
      firstName,
      lastName,
      email,
      username,
      password,
      userType,
    };

    // Attach Frontend With Backend Fetching Data using axios
    const response = await axios.post(
      "http://localhost:8080/api/register",
      user
    );
    if (response.status === 200) {
      toast.success("User Added");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setUserType("");
      setUsername("");
      navigate("/");
    }
  };

  useEffect(() => {
    if (password.length > 0 && password?.trim()?.length <= 6) {
      setPasswordValidationMessage(
        "Password Length must be greater than 6 characters"
      );
    } else {
      setPasswordValidationMessage("");
    }
  }, [password]);

  const handleGoogleLogin = async (response) => {
    try {
      const { credential } = response;
      const { data } = await axios.post("http://localhost:8080/api/auth/google", {
        token: credential,
      });

      const user = data.user;
      const token = data.token;

      if (user && token) {
        // If Google login is successful, update user context and navigate
        // Optionally, you can save the user in context and redirect
        navigate("/");
        toast.success("User registered with Google");
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      toast.error("Google Login failed");
    }
  };

  return (
    <div id={styles.signUpBody}>
      <div id={styles.signUpBG}>
        <div className={styles.greenLayer}></div>
      </div>
      <div>
        <h2>Create An Account</h2>
        <form className={styles.signUpform} onSubmit={handleSubmit}>
          <div className="d-flex flex-column flex-lg-row flex-sm-column mt-5">
            <div className="col-12 col-sm-12 col-lg-6  form-floating mx-2 ">
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="form-control"
                placeholder="first name"
                value={firstName}
                required
                onChange={(event) => setFirstName(event.target.value)}
              />
              <label htmlFor="firstName">First Name</label>
            </div>
            <div className="col-12  col-sm-12 col-lg-6  mt-3 mt-sm-3 mt-lg-0 form-floating mx-2">
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="form-control"
                placeholder="last name"
                value={lastName}
                required
                onChange={(event) => setLastName(event.target.value)}
              />
              <label htmlFor="lastName">Last Name</label>
            </div>
          </div>

          <div className="form-floating mt-3 col-12 mx-2">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="name@example.com"
              value={email}
              onChange={(event) => {
              setEmail(event.target.value);
              setEmailError(""); // clear error on typing
            }}
              required
              className="form-control"
            />
            <label htmlFor="email">Email</label>
          </div>
          {emailError && <div className="text-danger mx-2">{emailError}</div>}
          <div className="col-12 col-sm-12 col-lg-6  form-floating mx-2 ">
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              placeholder="username"
              value={username}
              required
              onChange={(event) => setUsername(event.target.value)}
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="form-floating mt-3 col-12 mx-2">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="form-control"
              required
              placeholder="password"
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="mx-2 text-danger"> {passwordValidationMessage}</div>

          <div className="form-floating mt-3 col-12 mx-2">
            <select
              id="userType"
              name="userType"
              value={userType}
              onChange={(event) => setUserType(event.target.value)}
              className="form-select"
              required
            >
              <option value=""></option>
              <option value="Patient">Patient</option>
              <option value="Doctor">Doctor</option>
              <option value="Admin">Admin</option>
            </select>
            <label htmlFor="userType">User Type</label>
          </div>

          {/* Google Login Button */}
          {/* <div className="d-flex justify-content-center mt-4">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={(error) => console.error("Login Failed:", error)}
              useOneTap
            />
          </div> */}

          <div className="form-group form-check mt-5 mx-2">
            <input
              type="checkbox"
              className="form-check-input"
              id="terms-chkbox"
              required
            />
            <label className="" htmlFor="terms-chkbox">
              I agree with the terms and conditons
            </label>
          </div>
          <div className="text-center">
            <button id={styles.signUpBtn} type="submit">
              Sign Up
            </button>
          </div>
          <div className="text-center">
            Already have an account?{" "}
            <NavLink to="/login" exact>
              Sign In
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

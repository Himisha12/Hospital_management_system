import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddUser() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState("");
  const [errorList, setErrorList] = useState([]);

  const validateInputs = () => {
    const nameRegex = /^[A-Za-z]{3,}$/;
      const usernameRegex = /^[a-zA-Z0-9]{4,20}$/; 
      // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/;
      const emailRegex = /^[-!#-'*+\/-9=?A-Z^-~]+(\.[-!#-'*+\/-9=?A-Z^-~]+)*|"([\]!#-[^-~ \t]|(\\[\t -~]))+"@([-!#-'*+\/-9=?A-Z^-~]+(\.[-!#-'*+\/-9=?A-Z^-~]+)*|\[[\t -Z^-~]*])$/;  // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

      const passwordRegex = /^.{6}$/; // Password must be at least 6 characters long and contain letters and numbers
      const departmentRegex = /^[a-zA-Z\s]{3,}$/; 
      const phoneRegex = /^[6-9]\d{9}$/;
    if (!nameRegex.test(firstName)) {
      toast.error("Invalid First Name. Only alphabets allowed.");
      return false;
    }
  
    if (!nameRegex.test(lastName)) {
      toast.error("Invalid Last Name. Only alphabets allowed.");
      return false;
    }
  
    if (!usernameRegex.test(username)) {
      toast.error("Username must be at least 4 characters and alphanumeric.");
      return false;
    }
  
    if (!emailRegex.test(email)) {
      toast.error("Invalid Email Address.");
      return false;
    }
  
    if (!passwordRegex.test(password)) {
      toast.error("Password must be at least 6 characters with letters and numbers.");
      return false;
    }
  
    return true;
  };
  
  const addUser = async (event) => {
    event.preventDefault();

    if (!validateInputs()) return;

    const form = document.forms.addUserForm;
    const user = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      username: form.username.value,
      email: form.email.value,
      password: form.password.value,
      userType: form.userType.value,
    };

    try {
      // Add User using Axios Method
      const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();

        toast.error(errorData);
        return;
      }

      const data = await response.json();
      console.log(data);

      if (data.message === "success") {
        toast.success("User Added Successfully");
        navigate("/users");
      }
    } catch (error) {
      toast.error("Error:", error);
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

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div className="page-wrapper">
        <div className="content">
          <div class="card-box">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <h4 className="page-title">Add User</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <form id="addUserForm" name="addUserForm" onSubmit={addUser}>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          First Name <span className="text-danger">*</span>
                        </label>
                        <input
                          name="firstName"
                          className="form-control"
                          type="text"
                          required
                          value={firstName}
                          onChange={(event) => setFirstName(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Last Name</label>
                        <input
                          name="lastName"
                          className="form-control"
                          type="text"
                          required
                          value={lastName}
                          onChange={(event) => setLastName(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Username <span className="text-danger">*</span>
                        </label>
                        <input
                          name="username"
                          className="form-control"
                          type="text"
                          required
                          value={username}
                          onChange={(event) => setUsername(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Email <span className="text-danger">*</span>
                        </label>
                        <input
                          name="email"
                          className="form-control"
                          type="email"
                          required
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Password</label>
                        <input
                          name="password"
                          className="form-control"
                          type="password"
                          required
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Role</label>
                        <select
                          name="userType"
                          className="form-select"
                          value={userType}
                          onChange={(event) => setUserType(event.target.value)}
                        >
                          <option value="Admin">Admin</option>
                          <option value="Doctor">Doctor</option>
                          <option value="Patient">Patient</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="m-t-20 text-center">
                    <button
                      id="signUp"
                      type="submit"
                      className="btn btn-primary submit-btn"
                    >
                      Create User
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default AddUser;

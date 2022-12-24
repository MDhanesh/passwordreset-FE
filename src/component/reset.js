import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Reset() {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPassword = {
      id: id,
      token: token,
      password: password,
      confirmpassword: confirmpassword,
    };
    console.log(updatedPassword);
    if (password !== confirmpassword) {
      window.alert("Passwords does not match");
    } else {
      const response = await axios.post(
        `http://localhost:4000/register/resetpassword/${id}/${token}`,
        {
          id: id,
          token: token,
          password: password,
          confirmpassword: confirmpassword,
        }
      );
      if (response.data) {
        if (response.data.message === "User Not Exist") {
          window.alert("User not exists!! Please sign up and create a new one");
        }
        if (response.data.message === "Password updated") {
          window.alert("Password updated successfully!!");
          navigate("/");
        }
        if (response.data.message === "Something went wrong") {
          window.alert("Token expired!!");
        }
      }
    }
  };

  return (
    <>
      {" "}
      <nav className="navbar navbar-dark bg-dark  text-center">
        <div className="container">
          <h5 className="navbar-text fw-bold justify-content-center align-content-center ">
            Customer Relationship Management
          </h5>
        </div>
      </nav>
      <div className=" vh-100 gradient-custom">
        <section className="Auth-form-container ">
          <div className="container d-flex flex-column">
            <div
              className="row align-items-center justify-content-center
      min-vh-100 g-0"
            >
              <div className="col-12 col-md-8 col-lg-4 border-top border-3 border-primary">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <div className="mb-4">
                      <h5>Reset Password</h5>
                    </div>
                    <div className="mb-3">
                      <label htmlforr="password" className="form-label">
                        Password
                      </label>
                      <input
                        autoComplete="off"
                        type="password"
                        className="form-control"
                        name="email"
                        placeholder="Enter Your password"
                        required
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Confirm Password
                      </label>
                      <input
                        autoComplete="off"
                        type="password"
                        className="form-control"
                        name="email"
                        placeholder="Confirm password"
                        required
                        value={confirmpassword}
                        onChange={(e) => setconfirmpassword(e.target.value)}
                      />
                    </div>
                    <div className="mb-3 d-grid">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={(e) => handleSubmit(e)}
                      >
                        Change password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Reset;

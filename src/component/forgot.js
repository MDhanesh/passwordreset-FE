import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function Forgot() {
  const [email, setUsername] = useState("");
  const handleSubmit = async (e) => {
    const response = await axios.post("http://localhost:4000/register/forgot", {
      email: email,
    });
    console.log(response);
    if (response) {
      if (response.data.message === "Email sent successfully") {
        window.alert(
          "success!! Password reset link has been sent to your mail"
        );
      } else {
        window.alert("Please enter valid and registered email ID");
      }
    }
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark  text-center ">
        <div className="container">
          <h5 className="navbar-text fw-bold justify-content-center align-content-center ">
            Password
          </h5>
          <Link to="/">
            <button className="btn btn-primary" type="submit">
              SIGNUP
            </button>
          </Link>
        </div>
      </nav>
      <div className="vh-100 gradient-custom">
        <section className="container d-flex flex-column ">
          <div
            className="row align-items-center justify-content-center
      min-vh-100 g-0"
          >
            <div className="col-12 col-md-8 col-lg-4 border-top border-3 border-primary">
              <div className="card shadow-sm">
                <div className="card-body">
                  <div className="mb-4">
                    <h5>Forgot Password?</h5>
                    <p className="mb-2">
                      Enter your registered email ID to get reset password link
                    </p>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      name="email"
                      placeholder="Enter Your Email"
                      required
                      onChange={(event) => setUsername(event.target.value)}
                      label="Email"
                      value={email}
                    />
                  </div>
                  <div className="mb-3 d-grid">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={() => handleSubmit()}
                    >
                      Send reset Link
                    </button>
                  </div>
                  <span>
                    Don't have an account? <Link to="/">sign in</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

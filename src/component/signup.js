import React, { useState } from "react";
import "./registration.css";
import one from "../assets/one.svg";
import two from "../assets/two.svg";
import { useFormik } from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  // const [userData, setUserData] = useState([]);
  const [signIn, setSignIn] = useState(false);
  const SignInHandleClick = (e) => {
    e.preventDefault();
    setSignIn(false);
  };
  const SignUpHandleClick = (e) => {
    e.preventDefault();
    setSignIn(true);
  };
  //signup formik
  let Formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    validate: (values) => {
      var errors = {};
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (values.name === "") errors.name = "Name is Required";
      //  if (!regex.test(values.email)) errors.email = "Email is Required";
      if (!values.email) {
        errors.email = "Email is Required";
      } else if (!regex.test(values.email)) {
        errors.email = "Invalid email format";
      }
      //if (values.password === "") errors.password = "password is Required";
      if (!values.password) {
        errors.password = "password is Required";
      } else if (values.password.length < 7) {
        errors.password = "Password must be more than 7 characters";
      }
      // if (values.confirmpassword === "")
      //   errors.confirmpassword = "Confirm Password is Required";
      if (!values.confirmpassword) {
        errors.confirmpassword = "password is Required";
      } else if (values.confirmpassword.length < 7) {
        errors.confirmpassword = "Password must be more than 7 characters";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        // console.log(values);
        const response = await axios.post(
          `https://password-reset-n10p.onrender.com/register/signup`,
          {
            ...values,
          }
        );
        // console.log(response);

        if (response.data) {
          localStorage.setItem("token", response.data);
          Swal.fire({
            title: "User Created Successfully",
            icon: "success",
            confirmButtonText: "okay",
          });
          navigate("/");
        }
        if (response.status === 200) {
          alert(" Account Created sucessfully");
        }
      } catch (error) {
        console.log(error);
        window.alert("Please enter registered email ID and Password");
      }
    },
  });
  //signin formik
  let FormikSignin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      var errors = {};
      if (values.email === "") errors.email = "Email is Required";
      if (values.password === "") errors.password = "Password is Required";
      return errors;
    },
    onSubmit: async (values) => {
      try {
        // console.log(values);
        const response = await axios.post(
          "https://password-reset-n10p.onrender.com/register/signin",
          {
            ...values,
          }
        );
        navigate("/home");
        //console.log(response);
        if (response.data) {
          localStorage.setItem("token", response.data);
        }
      } catch (error) {
        console.log(error.response.data.msg);
        Swal.fire({
          title: "Wrong credentials",
          icon: "error",
          confirmButtonText: "okay",
        });
      }
    },
  });
  return (
    <div className={`containers ${signIn ? "sign-up-mode" : ""}`}>
      <div className="forms-container ">
        <div className="signin-signup">
          <form onSubmit={FormikSignin.handleSubmit} className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fa fa-envelope"></i>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={FormikSignin.values.email}
                onBlur={FormikSignin.handleBlur}
                onChange={FormikSignin.handleChange}
              />
            </div>
            <div style={{ color: "red" }}>
              {FormikSignin.touched.email && FormikSignin.errors.email}
            </div>
            <div className="input-field">
              <i className="fa fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={FormikSignin.values.password}
                onChange={FormikSignin.handleChange}
                onBlur={FormikSignin.handleBlur}
              />
            </div>
            <div style={{ color: "red" }}>
              {FormikSignin.touched.password && FormikSignin.errors.password}
            </div>
            <a href="/forgot">Forgot Password?</a>
            <input type="submit" value="login" className="btns solid" />
          </form>
          {/* sign up page */}
          <form onSubmit={Formik.handleSubmit} className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fa fa-user"></i>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={Formik.values.name}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
              />
            </div>
            <div style={{ color: "red" }}>
              {Formik.touched.name && Formik.errors.name}
            </div>
            <div className="input-field">
              <i className="fa fa-envelope"></i>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={Formik.values.email}
                onBlur={Formik.handleBlur}
                onChange={Formik.handleChange}
              />
            </div>
            <div style={{ color: "red" }}>
              {Formik.touched.email && Formik.errors.email}
            </div>
            <div className="input-field">
              <i className="fa fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={Formik.values.password}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
              />
            </div>
            <div style={{ color: "red" }}>
              {Formik.touched.password && Formik.errors.password}
            </div>
            <div className="input-field">
              <i className="fa fa-lock"></i>
              <input
                type="password"
                name="confirmpassword"
                placeholder="Confirm Password"
                value={Formik.values.confirmpassword}
                onBlur={Formik.handleBlur}
                onChange={Formik.handleChange}
              />
            </div>
            <div style={{ color: "red" }}>
              {Formik.touched.confirmpassword && Formik.errors.confirmpassword}
            </div>
            <input type="submit" value="sign up" className="btns solid" />
          </form>
        </div>
      </div>
      <div className="panel-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Signup With us <br />
            </p>
            <button
              className="btns transparent"
              id="sign-up-btns"
              onClick={SignUpHandleClick}
            >
              sign Up
            </button>
          </div>

          <img src={one} className="image" alt=""></img>
        </div>
        <div className="panel right-panel ">
          <div className="content">
            <h3>One of us ?</h3>
            <p>Just Login with your email and password</p>

            <button
              className="btns transparent"
              id="sign-in-btns"
              onClick={SignInHandleClick}
            >
              Login
            </button>
          </div>
          <img src={two} className="image" alt=""></img>
        </div>
      </div>
    </div>
  );
}

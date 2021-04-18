import React, { useState } from "react";
import { Form, useFormik } from "formik";
import { Link } from "react-router-dom";
import Cleave from "cleave.js/react";
import Menu from "../components/Menu";
import "../style/signup.css";
import { signup } from "../actions";
import "cleave.js/dist/addons/cleave-phone.in";
import { connect } from "react-redux";
import { css } from 'styled-components';
import { BeatLoader } from 'react-spinners'


const override = css`
  display: block;
  margin: 0 auto;
  border-color: #fff;
`;

const Signup = ({ signup,loading }) => {
  const [file, setFile] = useState(null);
  console.log(file);
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      phoneno: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      const form = new FormData();
      form.append("firstname", values.firstname);
      form.append("lastname", values.lastname);
      form.append("username", values.username);
      form.append("email", values.email);
      form.append("phoneno", values.phoneno);
      form.append("password", values.password);
      form.append("profile", file);
      signup(form);
    },
  });

  return (
    <div className="container">
      <Menu />
      <div className="signup_wrapper">
        <div className="signup__header">
          <p className="header__title">Sign Up</p>
        </div>
        <form onSubmit={formik.handleSubmit} className="form__signup">
          <div className="input__group">
            <div className="input__signup-wrapper">
              <label>firstname</label>
              <input
                type="text"
                name="firstname"
                onChange={formik.handleChange}
                value={formik.values.firstname}
              />
            </div>
            <div className="input__signup-wrapper">
              <label>lastname</label>
              <input
                type="text"
                name="lastname"
                onChange={formik.handleChange}
                value={formik.values.lastname}
              />
            </div>
          </div>
          <div className="input__signup-wrapper">
            <label>Username</label>
            <input
              type="text"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
          </div>
          <div className="input__signup-wrapper">
            <label>Phone No</label>
            <Cleave
              options={{ phone: true, phoneRegionCode: "IN" }}
              name="phoneno"
              onChange={formik.handleChange}
            />
          </div>
          <div className="input__signup-wrapper">
            <label>Email</label>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </div>
          <div className="input__signup-wrapper">
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>
          <div className="input__signup-wrapper">
            <label>Select Profile</label>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          </div>
          {loading ? (
            <button className="form__button">
              <BeatLoader
                css={override}
                color={"white"}
                size={15}
              />
            </button>
          ) : (
            <button className="form__button">submit</button>
          )}
          <div className="form__option">
            <p>
              Already have an account?
              <Link to="/signin">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.pmReducers.loading,
  };
};

export default connect(mapStateToProps, { signup })(Signup);

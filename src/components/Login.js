import React from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { css } from "styled-components";
import { login } from '../actions'
import "../style/auth.css";
import Menu from "./Menu";
import { BeatLoader } from 'react-spinners'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #fff;
`;

const Signin = ({ login,loading }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      login(values);
    },
  });

  return (
    <div className="container">
      <Menu />
      <div className="wrapper">
        <div className="header">
          <p className="header__title">Login</p>
          <p className="header__subtitle">Welcome back</p>
        </div>
        <form onSubmit={formik.handleSubmit} className="form">
          <div className="input__wrapper">
            <label>Email</label>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </div>
          <div className="input__wrapper">
            <label>password</label>
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <Link to="/forgotpassword" className="forgot">
              forgot your password?
            </Link>
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
              Don't have an account?<Link to="/signup">Join</Link>
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

export default connect(mapStateToProps,{ login })(Signin);

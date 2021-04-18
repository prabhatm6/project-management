import { useFormik } from "formik";
import React from "react";
import { connect } from "react-redux";
import { forgotPassword } from "../actions";
import '../style/forgot.css'

const Forgotpass = ({ forgotPassword,history }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      newpassword: "",
    },
    onSubmit: (values) => {
      forgotPassword(values,() => history.push('/signin'));
    },
  });

  return (
    <div className="forgot__container">
      <form className="forgot__form" onSubmit={formik.handleSubmit}>
        <div>
          <input
            type="text"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="Enter your Email"
          />
        </div>
        <div>
          <input
            type="password"
            name="newpassword"
            value={formik.values.newpassword}
            placeholder="Enter New password"
            onChange={formik.handleChange}
          />
        </div>
        <button>update</button>
      </form>
    </div>
  );
};

export default connect(null, { forgotPassword })(Forgotpass);

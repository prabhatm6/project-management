import React from "react";
import "../style/ProjectForm.css";
import { useFormik } from "formik";
// import DatePicker from "react-datepicker";
import Menu from "./Menu";
import { createProject } from "../actions";
import { connect } from "react-redux";

const ProjectInfoForm = ({ createProject,history }) => {
  const formik = useFormik({
    initialValues: {
      projectName: "",
      dueDate: "",
      description: "",
    },
    onSubmit: (values) => {
      createProject(values,() => history.push('/'));
    },
  });
  return (
    <div className="container">
      <Menu />
      <>
        <form onSubmit={formik.handleSubmit} className="form__wrapper">
          <div className="form__header">
            <p>New Project</p>
          </div>
          <div className="form__box">
            <div className="input__box">
              <label>Project Name</label>
              <input
                placeholder="Enter your project name"
                type="text"
                name="projectName"
                onChange={formik.handleChange}
                value={formik.values.projectName}
                required
              />
            </div>
            <div className="input__box">
              <label>DueDate</label>
              <input
                placeholder="Enter Due Date"
                type="date"
                name="dueDate"
                onChange={formik.handleChange}
                value={formik.values.dueDate}
                required
              />
            </div>
            <div className="input__box">
              <label>Project Description</label>
              <textarea
                placeholder="Enter your project Details"
                rows="8"
                type="text"
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
                required
              />
            </div>
            <button>submit</button>
          </div>
        </form>
      </>
    </div>
  );
};

export default connect(null, { createProject })(ProjectInfoForm);

import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import Menu from "./Menu";
import "../style/home.css";
import styled from "styled-components";
import { connect } from "react-redux";
import { editProject } from "../actions";

const DescriptionContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);

  display: ${(props) => (props.show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
`;

const ProjectDescripton = ({ show, setShow, singleProject, editProject }) => {
  const containerRef = useRef();

  const formik = useFormik({
    initialValues: {
      projectName: "",
      dueDate: "",
      description: "",
    },
    onSubmit: (values) => {
      console.log(values);
      // editProject()
    },
  });

  const dismissModal = (e) => {
    e.target === containerRef.current && setShow(false);
  };

  return (
    <>
      {/* <p>uaduihaw</p> */}
      {singleProject && (
        <DescriptionContainer
          show={show}
          ref={containerRef}
          className="desc__container"
          onClick={(e) => dismissModal(e)}
        >
          <div className="description">
            <div className="desc__card">
              <div className="desc__body">
                <p className="desc__title">
                  Project Name: <br /> {singleProject.projectName}
                </p>
                <p className="desc__due">
                  Due Date: <br /> {singleProject.dueDate}
                </p>
                <p className="desc__about">
                  About: <br /> {singleProject.description}
                </p>
              </div>
            </div>
            <div className="edit">
              <h3 style={{ textAlign: "center", marginTop: "10px" }}>
                Edit {singleProject.projectName}
              </h3>
              <form
                onSubmit={formik.handleSubmit}
                key={singleProject.projectName}
              >
                <div className="desc__input-group">
                  <input
                    defaultValue={singleProject?.projectName}
                    type="text"
                    name="projectName"
                    // value={formik.values.projectName}
                    disabled
                  />
                </div>
                <div className="desc__input-group">
                  <input
                    defaultValue={singleProject?.dueDate}
                    type="date"
                    name="dueDate"
                    disabled
                  />
                </div>
                <div className="desc__input-group">
                  <textarea
                    defaultValue={singleProject?.description}
                    // value={formik.values.description}
                    rows="5"
                    type="text"
                    name="description"
                    onChange={formik.handleChange}
                  />
                </div>
                <button onClick={() => editProject(singleProject?._id,formik.values)}>submit</button>
              </form>
            </div>
          </div>
        </DescriptionContainer>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    singleProject: state.pmReducers.singleProject,
  };
};

export default connect(mapStateToProps, { editProject })(ProjectDescripton);

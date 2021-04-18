import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Menu from "./Menu";
import { getUser } from "../actions";
import "../style/home.css";
import { getAllProject, getProject, getEntireProject } from "../actions";
import ProjectDescripton from "./ProjectDescripton";

const Home = ({
  getUser,
  getAllProject,
  getEntireProject,
  projects,
  getProject,
  entireProjects,
  user,
}) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    getUser();
    getAllProject();
    getEntireProject();
  }, []);

  const renderProjects = (projects) => {
    return projects.map((project) => {
      return (
        <div className="main__card" key={project._id}>
          <div className="card__body">
            <p className="card__title">{project.projectName}</p>
            <p className="card__due">Due Date:{project.dueDate}</p>
            <button
              className="card__btn"
              onClick={() => {
                setShow(true);
                getProject(project._id);
              }}
            >
              More
            </button>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <div className="container">
        <Menu />
        {projects && entireProjects ? (
          <>
            {user.isAdmin ? (
              <div className="main">{renderProjects(entireProjects)}</div>
            ) : (
              <div className="main">{renderProjects(projects)}</div>
            )}
            <ProjectDescripton show={show} setShow={setShow} />
          </>
        ) : null}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    projects: state.pmReducers.projects,
    singleProject: state.pmReducers.singleProject,
    entireProjects: state.pmReducers.entireProjects,
    user: state.pmReducers.user,
  };
};

export default connect(mapStateToProps, {
  getUser,
  getAllProject,
  getProject,
  getEntireProject,
})(Home);

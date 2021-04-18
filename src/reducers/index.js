import { combineReducers } from "redux";

const pmReducers = (
  state = {
    user: null,
    loading: false,
    groupMessage: null,
    allusers: null,
    adminMessages: null,
    projects: null,
    singleProject: null,
    entireProjects:null
  },
  action
) => {
  switch (action.type) {
    case "USER":
      return { ...state, user: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "GET_MESSAGES":
      return { ...state, groupMessage: action.payload };
    case "GET_ADMIN_MESSAGES":
      return { ...state, adminMessages: action.payload };
    case "ALL_USER":
      return { ...state, allusers: action.payload };
    case "ALL_PROJECTS":
      return { ...state, projects: action.payload };
    case "ENTIRE_PROJECTS":
      return { ...state, entireProjects: action.payload };
    case "PROJECT":
      return { ...state, singleProject: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  pmReducers,
});

// const { default: axios } = require("axios");
import axios from "axios";
import jsCookie from "js-cookie";
import { NotificationManager } from "react-notifications";

// const URL = "http://localhost:5000/project";
const URL = " https://projectmanage-backend.herokuapp.com/project";

export const signup = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const res = await axios.post(`${URL}/signup`, data);
      if (res.data.status === "success") {
        jsCookie.set("jwt", res.data.token);
        localStorage.setItem("userid", res.data.user._id);
        dispatch({ type: "SET_LOADING", payload: false });
        NotificationManager.success("Account is created!");
        setTimeout(() => {
          window.location.assign("/");
        }, 1000);
      }
    } catch (error) {
      const err = error.response.data.message;

      dispatch({ type: "SET_LOADING", payload: false });
      NotificationManager.error(err, "Error");
    }
  };
};

export const login = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const res = await axios.post(`${URL}/signin`, data);
      if (res.data.status === "success") {
        jsCookie.set("jwt", res.data.token);
        localStorage.setItem("userid", res.data.user._id);
        dispatch({ type: "SET_LOADING", payload: false });
        NotificationManager.success("successfully logged in", "Log in");
        setTimeout(() => {
          window.location.assign("/");
        }, 1000);
      }
    } catch (error) {
      dispatch({ type: "SET_LOADING", payload: false });
      const err = error.response.data.message;
      NotificationManager.error(err, "Error");
    }
  };
};
export const getUser = () => {
  return async (dispatch) => {
    try {
      const userid = localStorage.getItem("userid");
      const res = await axios.get(`${URL}/user/${userid}`);
      if (res.data.status === "success") {
        dispatch({ type: "USER", payload: res.data.user });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};
export const getProject = (pid) => {
  return async (dispatch) => {
    try {
      const userid = localStorage.getItem("userid");
      const res = await axios.get(`${URL}/getproject/${pid}`);
      if (res.data.status === "success") {
        dispatch({ type: "PROJECT", payload: res.data.project });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};
export const getAllProject = (pid) => {
  return async (dispatch) => {
    const token = jsCookie.get("jwt");
    try {
      const userid = localStorage.getItem("userid");
      const res = await axios.get(`${URL}/get/allproject`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      if (res.data.status === "success") {
        dispatch({ type: "ALL_PROJECTS", payload: res.data.projects });
      }
    } catch (error) {
      // console.log(error.response);
    }
  };
};
export const getEntireProject = () => {
  return async (dispatch) => {
    const token = jsCookie.get("jwt");
    try {
      const userid = localStorage.getItem("userid");
      const res = await axios.get(`${URL}/get/entireproject`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      if (res.data.status === "success") {
        dispatch({ type: "ENTIRE_PROJECTS", payload: res.data.projects });
      }
    } catch (error) {
      // console.log(error.response);
    }
  };
};
export const editProject = (pid, data) => {
  return async (dispatch) => {
    try {
      const userid = localStorage.getItem("userid");
      const res = await axios.patch(`${URL}/editproject/${pid}`, data);
      if (res.data.status === "success") {
        const res = await axios.get(`${URL}/getproject/${pid}`);
        dispatch({ type: "PROJECT", payload: res.data.project });
      }
    } catch (error) {
      // console.log(error.response);
    }
  };
};

export const getGlobalGroup = () => {
  return async (dispatch) => {
    try {
      const userid = localStorage.getItem("userid");
      const res = await axios.get(`${URL}/group/607be06225601f160ca0c82f`);
      console.log(res.data);
      if (res.data.status === "success") {
        dispatch({ type: "GET_MESSAGES", payload: res.data.group.messages });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};
export const getAdminGroup = () => {
  return async (dispatch) => {
    try {
      const userid = localStorage.getItem("userid");
      const res = await axios.get(`${URL}/group/607bdff325601f160ca0c82c`);
      console.log(res.data);
      if (res.data.status === "success") {
        dispatch({
          type: "GET_ADMIN_MESSAGES",
          payload: res.data.group.messages,
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const createMsgGlobalGroup = (data) => {
  return async (dispatch) => {
    try {
      const userid = localStorage.getItem("userid");
      const token = jsCookie.get("jwt");
      const res = await axios.post(
        `${URL}/newmessage/607be06225601f160ca0c82f`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.status === "success") {
        const res = await axios.get(`${URL}/group/607be06225601f160ca0c82f`);
        dispatch({ type: "GET_MESSAGES", payload: res.data.group.messages });
        // dispatch({ type: "GET_AD", payload: res.data.ad });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};
export const createMsgAdminGroup = (data) => {
  return async (dispatch) => {
    try {
      const userid = localStorage.getItem("userid");
      const token = jsCookie.get("jwt");
      const res = await axios.post(
        `${URL}/newmessage/607bdff325601f160ca0c82c`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      if (res.data.status === "success") {
        const res = await axios.get(`${URL}/group/607bdff325601f160ca0c82c`);
        dispatch({
          type: "GET_ADMIN_MESSAGES",
          payload: res.data.group.messages,
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const getAllUser = () => {
  return async (dispatch) => {
    try {
      const userid = localStorage.getItem("userid");
      const res = await axios.get(`${URL}`);
      // console.log(res.data);
      if (res.data.status === "success") {
        dispatch({ type: "ALL_USER", payload: res.data.data });
      }
    } catch (error) {
      // console.log(error.response);
    }
  };
};
export const logout = () => {
  return async (dispatch) => {
    try {
      const userid = localStorage.removeItem("userid");
      jsCookie.remove("jwt");
      setTimeout(() => {
        window.location.assign("/signin");
      }, 1000);
    } catch (error) {
      // console.log(error.response);
    }
  };
};
export const forgotPassword = (data, callback) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${URL}/forgotpassword/user`, data);
      if (res.data.status === "success") {
        NotificationManager.success("Your password is updated!");
        callback();
      }
    } catch (error) {
      NotificationManager.error(error.response.data.message);
      // console.log(error.response);
    }
  };
};
export const createProject = (data, callback) => {
  return async (dispatch) => {
    const token = jsCookie.get("jwt");

    try {
      const res = await axios.post(`${URL}/createproject`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.status === "success") {
        NotificationManager.success("Your project is created");
        callback();
      }
    } catch (error) {
      NotificationManager.error(error.response.data.message);
      // console.log(error.response);
    }
  };
};

import React, { useEffect, useState, useRef } from "react";
import Menu from "./Menu";
import Attach from "../images/attach.svg";
import avtar1 from "../images/avtar-1.png";
import { useFormik } from "formik";
import { getAdminGroup, createMsgAdminGroup, getUser } from "../actions";
import "../style/chatbox.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";

const AdminChatBox = ({
  user,
  getAdminGroup,
  createMsgAdminGroup,
  messages,
  getUser,
}) => {
  const userid = localStorage.getItem("userid");
  const bottomRef = useRef();
  useEffect(() => {
    getUser();
    getAdminGroup();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const [file, setFile] = useState(null);
  const formik = useFormik({
    initialValues: {
      text: "",
    },
    onSubmit: (values) => {
      const form = new FormData();
      form.append("text", values.text);
      form.append("content", file);
      createMsgAdminGroup(form);
      setTimeout(() => {
        formik.resetForm();
      }, 1000);
    },
  });

  const renderMedia = (content, contentType) => {
    if (contentType === "jpg") {
      return (
        <div className="chat__media">
          <img src={content} />
        </div>
      );
    } else if (contentType === "pdf") {
      return (
        <div className="chat__media-link">
          <iframe
            type="application/pdf"
            src={content}
            style={{ height: "320px", width: "100%" }}
            width="300"
          ></iframe>
        </div>
      );
    }
  };

  const checkUser = (fromId) => {
    return userid === fromId;
  };

  const renderMessages = () => {
    return messages.map((message) => {
      return (
        <div
          className={
            checkUser(message.from._id)
              ? "chat__bubble-reverse"
              : `chat__bubble`
          }
        >
          <div
            className={
              checkUser(message.from._id)
                ? "chat__bubble-wrap-reverse"
                : "chat__bubble-wrap"
            }
          >
            <div
              className={
                checkUser(message.from._id)
                  ? "chat__avtar chat__avtar-reverse"
                  : "chat__avtar"
              }
            >
              <img src={avtar1} alt="avatar" />
            </div>
            <div
              className={
                checkUser(message.from._id)
                  ? "chat__info chat__info-reverse"
                  : "chat__info"
              }
            >
              {renderMedia(message.content, message.contentType)}
              <p
                className={
                  checkUser(message.from._id)
                    ? "chat__text chat__text-reverse"
                    : "chat__text"
                }
              >
                {message.text}
              </p>
              <p
                className={
                  checkUser(message.from._id)
                    ? "chat__time chat__time-reverse"
                    : "chat__time"
                }
              >
                <Moment fromNow ago>
                  {message.sentAt}
                </Moment>
              </p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container">
      <Menu />
      <div className="chat">
        {messages && (
          <>
            <div className="chat__box">
              {renderMessages()}
              <div className="bottom" ref={bottomRef}></div>
            </div>

            <div className="chat__form-wrap">
              {user.isAdmin ? (
                <form
                  onSubmit={formik.handleSubmit}
                  className="chat__text-form"
                >
                  <div>
                    <label>
                      <div className="chat__attach-icon">
                        <img src={Attach} alt="attach" />
                      </div>
                      <input
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{ display: "none" }}
                        type="file"
                      />
                    </label>
                  </div>

                  <div className="chat__input">
                    <input
                      autoComplete="off"
                      name="text"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.text}
                      placeholder="Enter your message here"
                    />
                    <button className="chat__send-button">
                      <span>Send</span>
                      <i class="bx bxs-send"></i>
                    </button>
                  </div>
                </form>
              ) : (
                <p>only admin can send messages</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    messages: state.pmReducers.adminMessages,
    user: state.pmReducers.user,
  };
};

export default connect(mapStateToProps, {
  getAdminGroup,
  createMsgAdminGroup,
  getUser,
})(AdminChatBox);

import React, { useEffect, useState, useRef } from "react";
import Menu from "./Menu";
import Attach from "../images/attach.svg";
import avtar1 from "../images/avtar-1.png";
import { useFormik } from "formik";
import { getGlobalGroup, createMsgGlobalGroup } from "../actions";
import "../style/chatbox.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";

const ChatBox = ({ getGlobalGroup, createMsgGlobalGroup, messages }) => {
  const userid = localStorage.getItem("userid");
  const bottomRef = useRef();
  useEffect(() => {
    getGlobalGroup();
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
      console.log(values);
      const form = new FormData();
      form.append("text", values.text);
      form.append("content", file);
      createMsgGlobalGroup(form);
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
    } else if (contentType === "video") {
      return (
        <div className="chat__media-link">
          <video
            controls
            type="application/mp4"
            style={{ height: "320px", width: "100%" }}
            width="300"
          >
            <source src={content}></source>
          </video>
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
              {message.from.profilephoto ? (
                <img src={message.from.profilephoto} />
              ) : (
                <img src={avtar1} alt="avatar" />
              )}
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
            <div className="chat__box" key={messages._id}>
              {renderMessages()}
              <div className="bottom" ref={bottomRef}></div>
            </div>

            <div className="chat__form-wrap">
              <form onSubmit={formik.handleSubmit} className="chat__text-form">
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    messages: state.pmReducers.groupMessage,
  };
};

export default connect(mapStateToProps, {
  getGlobalGroup,
  createMsgGlobalGroup,
})(ChatBox);

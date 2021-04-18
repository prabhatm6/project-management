import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "../style/menu.css";
import { logout } from "../actions";
import { connect } from "react-redux";
import jsCookie from "js-cookie";

const Sidemenu = styled.div`
  height: 100vh;
  transition: 0.1s ease-in;
  background-color: #000;
  width: ${(props) => (props.show ? "210px" : "42px")};
  color: #fff !important;
  box-shadow: 10px 6px 9px rgba(50, 50, 93, 0.1), 0 2px 5px rgba(0, 0, 0, 0.1),
    inset 0 1px #fff;
`;

const SideMenuItem = styled.li`
  padding: 10px;
  background-color: #fff;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
  text-align: center;
  justify-content: center;
  color: #000;
  width: ${(props) => (props.show ? "100%" : "42px")};
  color: #000;
`;
const MenuTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
  display: ${(props) => (props.show ? "block" : "none")};
`;
const MenuLinkSpan = styled.span`
  display: ${(props) => (props.show ? "block" : "none")};
  margin-left: 5px;
`;
const MenuLink = styled(Link)`
  display: flex;
  min-width: ${(props) => props.show && "100px"};
  align-items: center;
  color: #000;
`;

const Menu = ({ logout }) => {
  const token = jsCookie.get("jwt");
  const [show, setShow] = useState(false);
  return (
    <>
      <Sidemenu show={show} className="side-menu">
        <header className="menu-header">
          <MenuTitle show={show} className="menu-title">
            Project
          </MenuTitle>
          <div className="menu-toggle" onClick={() => setShow(!show)}>
            <i className="bx bx-menu-alt-right" id="menu-icon"></i>
          </div>
        </header>

        <ul className="menu-list">
          <div className="menu">
            {token && (
              <>
                <SideMenuItem show={show} className="menu-item">
                  <MenuLink className="menu__link" to="/new/project">
                    <i class="bx bx-plus"></i>

                    <MenuLinkSpan show={show}>New</MenuLinkSpan>
                  </MenuLink>
                </SideMenuItem>
                <SideMenuItem show={show} className="menu-item">
                  <MenuLink className="menu__link" to="/">
                    <i className="bx bx-home-alt"></i>
                    <MenuLinkSpan show={show}>Home</MenuLinkSpan>
                  </MenuLink>
                </SideMenuItem>
              </>
            )}
            {!token && (
              <>
                <SideMenuItem show={show} className="menu-item">
                  <MenuLink className="menu__link" to="/signin">
                    <i class="bx bxs-key"></i>
                    <MenuLinkSpan show={show}>Sign in</MenuLinkSpan>
                  </MenuLink>
                </SideMenuItem>
                <SideMenuItem show={show} className="menu-item">
                  <MenuLink className="menu__link" to="/signup">
                    <i class="bx bxs-user-plus"></i>
                    <MenuLinkSpan show={show}>Sign up</MenuLinkSpan>
                  </MenuLink>
                </SideMenuItem>
              </>
            )}
            {token && (
              <>
                <SideMenuItem show={show} className="menu-item">
                  <MenuLink className="menu__link" to="/admin-chat">
                    <i class="bx bx-group"></i>
                    <MenuLinkSpan show={show}>Guides</MenuLinkSpan>
                  </MenuLink>
                </SideMenuItem>
                <SideMenuItem show={show} className="menu-item">
                  <MenuLink className="menu__link" to="/chat">
                    <i class="bx bxs-chat"></i>
                    <MenuLinkSpan show={show}>Group chat</MenuLinkSpan>
                  </MenuLink>
                </SideMenuItem>
                <SideMenuItem
                  onClick={logout}
                  show={show}
                  className="menu-item"
                >
                  <MenuLink className="menu__link" to="#">
                    <i class="bx bxs-exit"></i>
                    <MenuLinkSpan show={show}>Log out</MenuLinkSpan>
                  </MenuLink>
                </SideMenuItem>
              </>
            )}
          </div>
        </ul>
      </Sidemenu>
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { logout })(Menu);

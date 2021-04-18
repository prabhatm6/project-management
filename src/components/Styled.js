import styled from "styled-components";
import { Link } from "react-router-dom";

export const SideContainer = styled.div``;

export const SideMenu = styled.div`
  height: 100vh;
  transition: 0.1s ease-in;
  background-color: #000;
  width: 41px;
  color: #fff;
`;
export const Header = styled.header`
  height: 60px;
  padding: 15px;
`;

export const MenuTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
  display: none;
`;
export const MenuToggle = styled.div``;

export const MenuList = styled.ul``;
export const Menu = styled.div``;
export const MenuItem = styled.li`
  padding: 10px 12px;
  background-color: green;

  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
`;

export const MenuLink = styled(Link)`
  color: inherit;
  font-weight: 500;
  margin-left: 10px;
`;

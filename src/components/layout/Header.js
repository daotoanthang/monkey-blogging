import React from "react";
import styled from "styled-components";
import { IconSearch } from "../icon";
import { Button } from "../button";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
const menuLink = [
  {
    url: "/#",
    title: "Home",
  },
  {
    url: "/blog",
    title: "Blog",
  },
  {
    url: "/",
    title: "Contact",
  },
];

const HeaderStyles = styled.header`
  padding: 40px 0;
  .header-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo {
    display: block;
    max-width: 50px;
  }
  .menu {
    display: flex;
    align-items: center;
    gap: 40px;
    margin-left: 40px;
    list-style: none;
    font-weight: 500;
  }

  .search {
    margin-left: auto;
    padding: 15px 25px;
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 100%;
    max-width: 320px;
    display: flex;
    align-items: center;
    font-weight: 500;
    position: relative;
    margin-right: 20px;
  }
  .search-input {
    flex: 1;
    padding-right: 45px;
  }
  .search-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 25px;
  }
  .header-button {
    margin-left: 20px;
  }
  .header-auth {
  }
`;

const getLastName = (name) => {
  if (!name) return "";
  const length = name.split(" ").length;
  return name.split(" ")[length - 1];
};

const Header = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  return (
    <HeaderStyles>
      <div className="container">
        <div className="header-main">
          <NavLink to="/">
            <img
              className="logo"
              srcSet="/logo-monkey.png 2x"
              alt="logo-monkey-blogging"
            />
          </NavLink>
          <ul className="menu">
            {menuLink.map((item) => (
              <li className="menu-item" key={item.title}>
                <NavLink className="menu-link" to={item.url}>
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
          {/* <div className="hidden search">
            <input
              type="text"
              className="search-input"
              placeholder="Search posts..."
            />
            <IconSearch className="search-icon"></IconSearch>
          </div> */}
          {!userInfo ? (
            <Button
              type="button"
              height="56px"
              className="header-button"
              to="/sign-in"
            >
              Sign In
            </Button>
          ) : (
            <div className="header-auth">
              <span>Welcome back, </span>
              <strong className="text-primary">
                {getLastName(userInfo?.displayName)}
              </strong>
              <Button onClick={() => navigate("/dashboard")} type="button">
                Dashboard
              </Button>
            </div>
          )}
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;

import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const NotFoundPageStyles = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .logo {
    display: inline-block;
    margin-bottom: 40px;
  }
  .heading {
    font-size: 60px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .back {
    display: inline-block;
    padding: 15px 30px;
    color: white;
    background: ${(props) => props.theme.primary};
    border-radius: 4px;
  }
`;

const NotFoundPage = () => {
  return (
    <NotFoundPageStyles>
      <NavLink to="/" className={"logo"}>
        <img srcSet="/logo-monkey.png 2x" alt="monkey-blogging" />
      </NavLink>
      <h1 className="heading">Oops! Page Not Found..</h1>
      <NavLink to="/" className={"back"}>
        Back to home
      </NavLink>
    </NotFoundPageStyles>
  );
};

export default NotFoundPage;

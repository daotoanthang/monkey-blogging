import React from "react";
import styled, { css } from "styled-components";
import { Link, NavLink } from "react-router-dom";

const PostTitleStyles = styled.h3`
  /* color: ${(props) => props.theme.gray23}; */
  font-weight: 600;
  line-height: 1.5;
  a {
    display: block;
  }
  ${(props) =>
    props.size === "normal" &&
    css`
      font-size: 18px;
    `};
  ${(props) =>
    props.size === "big" &&
    css`
      font-size: 22px;
    `};
`;
const PostTitle = ({
  children,
  className = "post-title",
  size = "normal",
  to = "",
}) => {
  return (
    <PostTitleStyles size={size} className={className}>
      <Link to={`/${to}`}>{children}</Link>
    </PostTitleStyles>
  );
};

export default PostTitle;

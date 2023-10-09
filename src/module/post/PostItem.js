import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";

const PostItemStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .post {
    &-image {
      height: 202px;
      margin-bottom: 20px;
      display: block;
      width: 100%;
      border-radius: 16px;
    }
    &-category {
      display: inline-block;
      padding: 8px;
      border-radius: 8px;
      color: #6b6b6b;
      font-size: 14px;
      font-weight: 600;
      background-color: #f3edff;
      margin-bottom: 16px;
    }

    &-title {
      margin-bottom: 12px;
    }
  }
`;
const PostItem = ({ data }) => {
  if (!data) return null;
  return (
    <PostItemStyles>
      <PostImage url={data.image} alt="" to={data.slug}></PostImage>
      <PostCategory to={data.category.slug}>{data.category.name}</PostCategory>
      <PostTitle to={data.slug}>{data.title}</PostTitle>
      <PostMeta
        date={new Date(data.createdAt.seconds * 1000).toLocaleDateString(
          "vi-VI"
        )}
        authorName={data.user.fullname}
        to={data.user.username}
      ></PostMeta>
    </PostItemStyles>
  );
};

export default PostItem;

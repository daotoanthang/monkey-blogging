import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";

const PostNewstLargeStyles = styled.div`
  .post {
    &-image {
      display: block;
      margin-bottom: 16px;
      height: 433px;
      border-radius: 16px;
    }
    &-category {
      margin-bottom: 10px;
    }
    &-title {
      margin-bottom: 10px;
    }
  }
`;

const PostNewstLarge = ({ data }) => {
  if (!data) return null;
  return (
    <PostNewstLargeStyles>
      <PostImage to={data?.slug} url={data?.image} alt="image"></PostImage>
      <PostCategory to={data?.category.slug}>
        {data?.category?.name}
      </PostCategory>
      <PostTitle to={data?.slug} size="big">
        {data?.title}
      </PostTitle>
      <PostMeta
        date={new Date(data?.createdAt.seconds * 1000).toLocaleDateString(
          "vi-VI"
        )}
        authorName={data?.user?.fullname}
        to={data?.user?.username}
      ></PostMeta>
    </PostNewstLargeStyles>
  );
};

export default PostNewstLarge;

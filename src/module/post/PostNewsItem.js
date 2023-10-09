import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";

const PostNewsItemStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid #ccc;
  &:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: 0;
  }
  .post {
    &-image {
      display: block;
      flex-shrink: 0;
      width: 180px;
      height: 130px;
      border-radius: 12px;
    }
    &-category {
      margin-bottom: 8px;
    }

    &-title {
      margin-bottom: 8px;
    }
  }
`;

const PostNewsItem = ({ data }) => {
  return (
    <PostNewsItemStyles>
      <PostImage to={data?.slug} url={data?.image} alt="image"></PostImage>

      <div className="post-content">
        <PostCategory type="secondary" to={data?.category.slug}>
          {data?.category?.name}
        </PostCategory>
        <PostTitle to={data?.slug}>{data?.title}</PostTitle>
        <PostMeta
          date={new Date(data?.createdAt.seconds * 1000).toLocaleDateString(
            "vi-VI"
          )}
          authorName={data.user.fullname}
          to={data?.user.username}
        ></PostMeta>
      </div>
    </PostNewsItemStyles>
  );
};

export default PostNewsItem;

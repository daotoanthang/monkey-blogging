import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import Heading from "../components/layout/Heading";
import PostItem from "../module/post/PostItem";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase-app/firebase-config";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");

    onSnapshot(colRef, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
        setPosts(results);
      });
    });
  });
  return (
    <Layout>
      <div className="container">
        <Heading>Tổng hợp bài viết</Heading>
        <div className="grid-layout grid-layout--primary">
          {posts.length > 0 &&
            posts.map((post) => (
              <PostItem key={post.id} data={post}></PostItem>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;

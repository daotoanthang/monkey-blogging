import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import Heading from "../components/layout/Heading";
import PostItem from "../module/post/PostItem";
import { useParams } from "react-router-dom";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase-app/firebase-config";

const AuthorPage = () => {
  const params = useParams();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getData() {
      const docRef = query(
        collection(db, "posts"),
        where("user.username", "==", params.slug)
      );
      onSnapshot(docRef, (snapshot) => {
        const results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPosts(results);
      });
    }
    getData();
  }, [params.slug]);

  return (
    <Layout>
      <div className="container">
        <Heading>Danh mục {params.slug}</Heading>
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

export default AuthorPage;

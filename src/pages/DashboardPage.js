import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase-app/firebase-config";
import styled from "styled-components";
import { collection, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";

const DashboardPageStyles = styled.div`
  .gallery {
    -webkit-column-count: 4;
    -moz-column-count: 4;
    column-count: 4;

    -webkit-column-gap: 20px;
    -moz-column-gap: 20px;
    column-gap: 20px;
  }
  @media (max-width: 1200px) {
    .gallery {
      -webkit-column-count: 3;
      -moz-column-count: 3;
      column-count: 3;

      -webkit-column-gap: 20px;
      -moz-column-gap: 20px;
      column-gap: 20px;
    }
  }
  @media (max-width: 800px) {
    .gallery {
      -webkit-column-count: 2;
      -moz-column-count: 2;
      column-count: 2;

      -webkit-column-gap: 20px;
      -moz-column-gap: 20px;
      column-gap: 20px;
    }
  }
  @media (max-width: 600px) {
    .allery {
      -webkit-column-count: 1;
      -moz-column-count: 1;
      column-count: 1;
    }
  }
  .gallery img {
    width: 100%;
    height: auto;
    margin: 4% auto;
    box-shadow: -3px 5px 15px #000;
    cursor: pointer;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
  }
  .modal-img,
  .model-vid {
    width: 100%;
    height: auto;
  }
  .modal-body {
    padding: 0px;
  }
`;

const DashboardPage = () => {
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
      });
      setPosts(results);
    });
  });
  return (
    <DashboardPageStyles>
      <h1 className="dashboard-heading">Dashboard page</h1>
      <div className="gallery">
        {posts.length > 0 &&
          posts.map((post) => <img key={post.id} src={post.image} alt="" />)}
      </div>
    </DashboardPageStyles>
  );
};

export default DashboardPage;

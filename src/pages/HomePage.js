import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase-app/firebase-config";
import styled from "styled-components";
import Layout from "../components/layout/Layout";
import HomeBanner from "../module/home/HomeBanner";
import HomeFeature from "../module/home/HomeFeature";
import HomeNews from "../module/home/HomeNews";
import { Button } from "../components/button";

const HomePageStyles = styled.div``;

const HomePage = () => {
  return (
    <HomePageStyles>
      <Layout>
        <HomeBanner></HomeBanner>
        <HomeFeature></HomeFeature>
        <HomeNews></HomeNews>
      </Layout>
    </HomePageStyles>
  );
};

export default HomePage;

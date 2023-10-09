import { doc, getDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { db } from "../../firebase-app/firebase-config";
import { useState } from "react";

const AuthorBox = ({ userId = "" }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    async function getDataUser() {
      const docRef = doc(db, "users", userId);
      const docSnapShot = await getDoc(docRef);
      if (docSnapShot.data()) {
        setUser(docSnapShot.data());
      }
    }
    getDataUser();
  }, [userId]);
  if (!userId || !user.username) return null;

  return (
    <div className="author">
      <div className="author-image">
        <img src={user.avatar} alt="avatar-user" />
      </div>
      <div className="author-content">
        <h3 className="author-name">{user.fullname}</h3>
        <p className="author-desc">
          A tender, humorous, and page-turning debut about a Vietnamese Canadian
          family in Toronto who will do whatever it takes to protect their
          no-frills nail salon after a new high end salon opens up
        </p>
      </div>
    </div>
  );
};

export default AuthorBox;

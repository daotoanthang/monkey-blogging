import React from "react";
import DashboardHeading from "../dashboard/DashboardHeading";
import { useState } from "react";
import UserTable from "./UserTable";
import { Button } from "../../components/button";
import { userRole } from "../../utils/constants";
import { useAuth } from "../../contexts/auth-context";

const UserManage = () => {
  const { userInfo } = useAuth();
  // if (userInfo.role !== userRole.ADMIN) {
  //   return null;
  // }
  return (
    <div>
      <DashboardHeading
        title="Users"
        desc="Manage your user"
      ></DashboardHeading>
      <div className="flex jusitfy-end mb-10">
        <Button kind="ghost" to="/manage/add-user">
          Add new user
        </Button>
      </div>
      <UserTable></UserTable>
    </div>
  );
};

export default UserManage;

import React from "react";
import { Button } from "../../components/button";
import Radio from "../../components/checkbox/Radio";
import { Field, FieldCheckboxes } from "../../components/field";
import DashboardHeading from "../dashboard/DashboardHeading";
import { Input } from "../../components/input";
import { Label } from "../../components/label";
import { useForm } from "react-hook-form";
import ImageUpload from "../../components/image/ImageUpload";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { userRole, userStatus } from "../../utils/constants";
import { useFirebaseImage } from "../../hooks/useFirebaseImage";
import { auth, db } from "../../firebase-app/firebase-config";
import {
  addDoc,
  collection,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import slugify from "slugify";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/auth-context";

const UserAddNew = () => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
    reset,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      username: "",
      avatar: "",
      status: userStatus.ACTIVE,
      role: userRole.USER,
      createdAt: new Date(),
    },
  });

  const watchRole = watch("role");
  const watchStatus = watch("status");
  const {
    image,
    progress,
    handleSelectImage,
    handleDeleteImage,
    handleResetUpload,
  } = useFirebaseImage(setValue, getValues);
  const { userInfo } = useAuth();
  if (userInfo.role !== userRole.ADMIN) {
    return null;
  }
  const handleCreateUser = async (values) => {
    console.log(values);
    if (!isValid) return;
    const colRef = collection(db, "users");
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      await updateProfile(auth.currentUser, {
        displayName: values.fullname,
      });
      await addDoc(colRef, {
        fullname: values.fullname,
        email: values.email,
        password: values.password,
        username: slugify(values.username || values.fullnamem, { lower: true }),
        avatar: image,
        status: Number(values.status),
        role: Number(values.role),
        createdAt: serverTimestamp(),
      });
      toast.success(
        `Create new user with email: ${values.email} successfully !`
      );
      reset({
        fullname: "",
        email: "",
        password: "",
        username: "",
        avatar: "",
        status: userStatus.ACTIVE,
        role: userRole.USER,
        createdAt: new Date(),
      });
      handleResetUpload();
    } catch (error) {
      toast.error("Can not create user");
      console.log(error);
    }
  };
  return (
    <div>
      <DashboardHeading
        title="New user"
        desc="Add new user to system"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleCreateUser)}>
        <div className="w-[200px] h-[200px] rounded-full mx-auto mb-10">
          <ImageUpload
            progress={progress}
            image={image}
            onChange={handleSelectImage}
            handleDeleteImage={handleDeleteImage}
            className="!rounded-full h-full"
          ></ImageUpload>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Fullname</Label>
            <Input
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter your email"
              control={control}
              type="email"
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              name="password"
              placeholder="Enter your password"
              control={control}
              type="password"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                checked={Number(watchStatus) === userStatus.ACTIVE}
                value={userStatus.ACTIVE}
                name="status"
                control={control}
              >
                Active
              </Radio>
              <Radio
                checked={Number(watchStatus) === userStatus.PENDING}
                value={userStatus.PENDING}
                name="status"
                control={control}
              >
                Pending
              </Radio>
              <Radio
                checked={Number(watchStatus) === userStatus.BAN}
                value={userStatus.BAN}
                name="status"
                control={control}
              >
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
              <Radio
                checked={Number(watchRole) === userRole.ADMIN}
                value={userRole.ADMIN}
                name="role"
                control={control}
              >
                Admin
              </Radio>
              <Radio
                checked={Number(watchRole) === userRole.MODE}
                value={userRole.MODE}
                name="role"
                control={control}
              >
                Moderator
              </Radio>

              <Radio
                checked={Number(watchRole) === userRole.USER}
                value={userRole.USER}
                name="role"
                control={control}
              >
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          isLoading={isSubmitting}
          disabled={isSubmitting}
          type="submit"
          kind="primary"
          className="mx-auto w-[200px]"
        >
          Add new user
        </Button>
      </form>
    </div>
  );
};

export default UserAddNew;

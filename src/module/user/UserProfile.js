import React, { useEffect } from "react";
import { Button } from "../../components/button";
import { Field } from "../../components/field";
import { Label } from "../../components/label";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import DashboardHeading from "../dashboard/DashboardHeading";
import ImageUpload from "../../components/image/ImageUpload";
import { useFirebaseImage } from "../../hooks/useFirebaseImage";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import { useAuth } from "../../contexts/auth-context";
import InputPassword from "../../components/input/InputPassword";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import slugify from "slugify";
import { toast } from "react-toastify";
import { auth } from "../../firebase-app/firebase-config";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
});

const UserProfile = () => {
  const { userInfo } = useAuth();

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const imageUrl = getValues("avatar");
  const imageRegex = /%2F(\S+)\?/gm.exec(imageUrl);
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";
  const { image, progress, handleSelectImage, handleDeleteImage, setImage } =
    useFirebaseImage(setValue, getValues, imageName, deleteAvatar);
  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);
  useEffect(() => {
    if (!userInfo.uid) return;
    async function getData() {
      const docRef = doc(db, "users", userInfo.uid);
      const singleDoc = await getDoc(docRef);
      reset(singleDoc.data());
    }
    getData();
  }, [userInfo.uid, reset]);

  const handleUpdateUserProfile = async (values) => {
    if (!isValid) return;
    try {
      if (values.password) {
        await updatePassword(userInfo, values.password);
      }
      await updateDoc(doc(db, "users", userInfo.uid), {
        // fullname: values.fullname,
        // email: values.email || userInfo.email,
        // username: slugify(values.username || values.fullname, { lower: true }),
        // photoURL: image || currURL,
        ...values,
        avatar: image,
      });
      await updateProfile(userInfo, {
        photoURL: image,
      });

      toast.success("Update profile successfully!");
    } catch (error) {
      console.log(error);
    }
    console.log(values);
  };
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(
        arrErrors[0]?.message,
        {
          pauseOnHover: false,
          delay: 0,
        },
        [errors]
      );
    }
  });
  async function deleteAvatar() {
    const colRef = doc(db, "users", userInfo.uid);
    await updateDoc(colRef, {
      avatar: "",
    });
  }

  return (
    <div>
      <DashboardHeading
        title="Account information"
        desc="Update your account information"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateUserProfile)}>
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
              control={control}
              name="fullname"
              placeholder="Enter your fullname"
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              control={control}
              name="username"
              placeholder="Enter your username"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Date of Birth</Label>
            <Input
              control={control}
              type="date"
              name="birthday"
              placeholder="dd/mm/yyyy"
            ></Input>
          </Field>
          <Field>
            <Label>Mobile Number</Label>
            <Input
              control={control}
              name="phone"
              placeholder="Enter your phone number"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              control={control}
              name="email"
              type="email"
              placeholder="Enter your email address"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="password" className="label">
              Password
            </Label>
            <InputPassword control={control}></InputPassword>
          </Field>
        </div>
        <Button
          isLoading={isSubmitting}
          disable={isSubmitting}
          type="submit"
          kind="primary"
          className="mx-auto w-[200px]"
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default UserProfile;

import React, { useState } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import InputField from "components/InputField";
import MultistepForm, { FormStep } from "components/MultistepForm";
import MyDatePicker from "components/MyDatePicker";
import * as Yup from "yup";
import SelectInput from "components/SelectInput";
import ImageDropzone from "components/ImageDropzone";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserRegisterMutation } from "../../state/api/authApi";
import Image from "mui-image";

const RegisterPage = () => {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const today = new Date();

  // rtk query hook
  const [registerUser, { isLoading, isError, error }] =
    useUserRegisterMutation();

  /* FORM VALIDATION */
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const phoneRegex = /^[0-9]{10}$/;
  const stepOneValidation = Yup.object().shape({
    userId: Yup.string()
      .test("userId-regex", "Invalid email or phone number", (value) => {
        value = value.trim();
        return emailRegex.test(value) || phoneRegex.test(value);
      })
      .required("Email or phone number is required"),
    password: Yup.string()
      .min(5, "Password should be of minimum 5 characters length")
      .required("Password is required"),
    lastName: Yup.string()
      .min(4, "Last name should be of minimum 4 characters length")
      .required("Last name is required"),
    firstName: Yup.string()
      .min(4, "First name should be of minimum 4 characters length")
      .required("First name is required"),
    gender: Yup.string().required("Gender field is required"),
    dateOfBirth: Yup.date()
      .max(today, "please enter a valid date")
      .required("Date of birth is required")
      .test("age", "Age should be greater 12 years", (value) => {
        const birthDate = new Date(value);
        const ageInMs = today - birthDate;
        const age = ageInMs / 31536000000;
        return age >= 12;
      }),
  });
  const stepTwoValidation = Yup.object().shape({
    occupation: Yup.string()
      .min(5, "Occupation should be of minimum 4 characters length")
      .max(20, "Occupation should be of maximum 20 characters length"),
    bio: Yup.string()
      .min(10, "Bio should be of minimum 10 characters length")
      .max(200, "Bio should be of maximum 200 characters length"),
  });
  const stepThreeValidation = Yup.object().shape({
    locality: Yup.string()
      .min(4, "locality should be of minimum 4 characters length")
      .max(20, "locality should be of maximum 20 characters length"),
    city: Yup.string()
      .min(4, "city should be of minimum 4 characters length")
      .max(20, "city should be of maximum 20 characters length"),
    state: Yup.string()
      .min(4, "state should be of minimum 4 characters length")
      .max(20, "state should be of maximum 20 characters length"),
    country: Yup.string()
      .min(4, "country should be of minimum 4 characters length")
      .max(20, "country should be of maximum 20 characters length"),
  });

  /* post data */
  const register = async (values, resetForm) => {
    try {
      let formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }

      const registeredUser = await registerUser(formData);
      if (isError || registeredUser.error) {
        toast(error || registeredUser.error.data.message);
      } else {
        toast("Registered successfully");
        resetForm();
        navigate("/login");
      }
    } catch (error) {
      const msg = error.response.data.message
        ? error.response.data.message
        : "Something went wrong!!!";
      toast(msg);
    }
  };

  return (
    <FlexBetween width={"100vw"} height={"100vh"} flexDirection={"column"}>
      <Box
        boxSizing={"border-box"}
        border={smallScreen ? "0rem" : "0.15rem solid"}
        py={2}
        borderRadius={3}
        borderColor={theme.palette.secondary.main}
        sx={{
          maxWidth: smallScreen ? "100%" : "50rem",
          width: "100%",
          height: smallScreen ? "100%" : "85%",
          maxHeight: smallScreen ? "100%" : "56rem",
          minHeight: "570px",
          px: "clamp(1rem, 1.5rem, 1.8rem)",
          overflowY: "auto",
        }}
      >
        <MultistepForm
          isLoading={isLoading}
          initialValues={{
            firstName: "",
            lastName: "",
            userId: "",
            dateOfBirth: new Date(),
            gender: "",
            password: "",
            image: null,
            bio: "",
            occupation: "",
            locality: "",
            city: "",
            state: "",
            country: "",
          }}
          onSubmit={(values, { resetForm }) => {
            register(values, resetForm);
          }}
        >
          <Box
            sx={{
              maxWidth: smallScreen ? "100%" : "85%",
              margin: "0 auto",
            }}
          >
            <FormStep
              stepName="Signup"
              onSubmit={() => console.log("step1 is submitted")}
              validationSchema={stepOneValidation}
            >
              <Box
                gap={smallScreen ? 0 : 2}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: smallScreen ? "column" : "row",
                }}
              >
                {" "}
                <InputField
                  required
                  type="text"
                  name="firstName"
                  label="First name"
                  margin="normal"
                ></InputField>
                <InputField
                  required
                  type="text"
                  name="lastName"
                  label="Last name"
                  margin="normal"
                ></InputField>
              </Box>

              <InputField
                required
                type="text"
                name="userId"
                label="Email or Phone number"
                margin="normal"
              ></InputField>
              <InputField
                required
                name="password"
                type="password"
                label="Password"
                margin="normal"
              ></InputField>
              <MyDatePicker
                name={{ name: "dateOfBirth" }}
                label="Date of birth"
                required={true}
              />
              <SelectInput
                required
                type="select"
                name="gender"
                label={"Gender"}
                margin="normal"
              ></SelectInput>
            </FormStep>
          </Box>
          <Box
            sx={{
              maxWidth: smallScreen ? "100%" : "85%",
              margin: "0 auto",
            }}
          >
            <FormStep
              stepName="Profile"
              onSubmit={() => console.log("step2 is submitted")}
              validationSchema={stepTwoValidation}
            >
              <Typography
                variant="h5"
                sx={{
                  width: "100%",
                  ml: "1rem",
                  color: theme.palette.neutral.main,
                  mb: "1rem",
                  fontWeight: "600",
                }}
              >
                Upload profile picture
              </Typography>
              <ImageDropzone name="image" />
              <FlexBetween
                m={"2rem 0 2rem 0"}
                width="100%"
                height="auto"
                flexDirection="column"
              >
                <InputField
                  type="text"
                  name="occupation"
                  label="Occupation"
                  margin="normal"
                ></InputField>
                <InputField
                  rows={3}
                  multiline={true}
                  name="bio"
                  type="text"
                  label="Bio..."
                  margin="normal"
                />
              </FlexBetween>
            </FormStep>
          </Box>
          <Box
            sx={{
              maxWidth: smallScreen ? "100%" : "85%",
              margin: "0 auto",
            }}
          >
            <FormStep
              stepName="Profile"
              onSubmit={() => console.log("step3 is submitted")}
              validationSchema={stepThreeValidation}
            >
              <Typography variant="h5" my={2} ml={1} color="primary">
                Where do you live?
              </Typography>
              <InputField
                type="text"
                name="locality"
                label="Locality"
                margin="normal"
              ></InputField>
              <InputField
                type="text"
                name="city"
                label="City"
                margin="normal"
              ></InputField>
              <InputField
                type="text"
                name="state"
                label="State"
                margin="normal"
              ></InputField>
              <InputField
                type="text"
                name="country"
                label="Country"
                margin="normal"
              ></InputField>
            </FormStep>
          </Box>
        </MultistepForm>
      </Box>
    </FlexBetween>
  );
};

export default RegisterPage;

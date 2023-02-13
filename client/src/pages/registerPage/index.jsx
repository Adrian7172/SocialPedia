import React from "react";
import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import InputField from "components/InputField";
import MultistepForm, { FormStep } from "components/MultistepForm";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "state/authSlice";
import MyDatePicker from "components/MyDatePicker";
import * as Yup from "yup";
import SelectInput from "components/SelectInput";

const RegisterPage = () => {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  /* FORM VALIDATION */
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const phoneRegex = /^[0-9]{10}$/;
  const stepOneValidation = Yup.object().shape({
    userId: Yup.string()
      .test("userId-regex", "Invalid email or phone number", (value) => {
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
    gender: Yup.string()
      .required("Gender field is required"),
    dateOfBirth: Yup.date().max(new Date(), "please enter a valid date").required("Date of birth is required"),
  });

  const dispatch = useDispatch();

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
          initialValues={{
            firstName: "",
            lastName: "",
            userId: "",
            dateOfBirth: new Date(),
            gender: "",
            password: "",
          }}
          onSubmit={(values, { resetForm }) => {
            alert(JSON.stringify(values, null, 2));
            resetForm();
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
          {/* <Box
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
              <FlexBetween gap={2}>
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
              </FlexBetween>

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
              <InputField
                required
                name="gender"
                label={"Gender"}
                margin="normal"
              ></InputField>
            </FormStep>
          </Box> */}
        </MultistepForm>
        {/* <Button onClick={() => dispatch(setMode())}>Switch</Button> */}
      </Box>
    </FlexBetween>
  );
};

export default RegisterPage;

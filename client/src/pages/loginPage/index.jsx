import {
  Box,
  Button,
  Divider,
  Link,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Image } from "mui-image";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik";
import FlexBetween from "components/FlexBetween";
import img from "assets/logo2.png";
import React from "react";
import * as Yup from "yup";
import axios from "axios";
import InputField from "components/InputField";

const LoginPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const mode = useSelector((state) => state.mode);

  /* BREAKPOINTS */
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  /* FORM VALIDATION */
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const phoneRegex = /^[0-9]{10}$/;

  const validationSchema = Yup.object().shape({
    userId: Yup.string()
      .test("userId-regex", "Invalid email or phone number", (value) => {
        return emailRegex.test(value) || phoneRegex.test(value);
      })
      .required("Email or phone number is required"),
    password: Yup.string()
      .min(5, "Password should be of minimum 5 characters length")
      .required("Password is required"),
  });

  /* FORMIK */
  const formik = useFormik({
    initialValues: {
      userId: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      alert(JSON.stringify(values, null, 2));
      login(values, resetForm);
    },
  });

  /* Post data */
  const login = async (values, resetForm) => {
    console.log(values);
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:3001/auth/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: values,
      });
      const loggedIn = response.data;
      resetForm();
      // set token and the user to redux

      navigate("/home");
    } catch (err) {
      console.log(err);
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
          maxWidth: smallScreen ? "100%" : "52rem",
          width: "100%",
          height: smallScreen ? "100%" : "85%",
          maxHeight: smallScreen ? "100%" : "56rem",
          minHeight: "570px",
          px: "clamp(1rem, 1.5rem, 1.8rem)",
        }}
      >
        <FlexBetween my={0.5}>
          <Image src={img} width={"60px"} height={"50px"} />
          {mode === "light" ? (
            <Typography
              ml={0.5}
              fontWeight={700}
              fontSize={"2.1rem"}
              color={"transparent"}
              style={{
                backgroundImage: "linear-gradient(to right, #0ab6b6, #00806a)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                MozBackgroundClip: "text",
              }}
            >
              SocialPedia
            </Typography>
          ) : null}
        </FlexBetween>

        <FlexBetween mt={4} flexDirection={"column"}>
          <Typography
            variant="h3"
            fontSize={"2.2rem"}
            fontWeight={"600"}
            color={theme.palette.neutral.main}
          >
            Sign in to Account
          </Typography>
          <Divider
            color={theme.palette.neutral.main}
            sx={{
              width: "6rem",
              height: "0.23rem",
              marginTop: "1rem",
              borderRadius: "5px",
            }}
          />
        </FlexBetween>
        <FlexBetween>
          <FormikProvider value={formik}>
            <FlexBetween flexDirection={"column"} width={"38rem"} mt={3}>
              <Form onSubmit={formik.handleSubmit}>
                <InputField
                  margin="normal"
                  required
                  label="Email or Phone number"
                  name="userId"
                  type="text"
                  autoComplete="email"
                />
                <InputField
                  margin="normal"
                  required
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="off"
                />
                {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
                <Box width mt={1}>
                  <Link href="#" variant="body2" fontSize={"1.6rem"}>
                    Forgot password?
                  </Link>
                </Box>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    font: "500 1.5rem poppins",
                    mt: 2.5,
                    mb: 2,
                    height: "5rem",
                    borderRadius: "1rem",
                  }}
                >
                  Sign In
                </Button>
                <FlexBetween my={2}>
                  <Link
                    href="/register"
                    variant="body2"
                    fontSize={"1.6rem"}
                    // onClick={() => navigate("")}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </FlexBetween>
              </Form>
            </FlexBetween>
          </FormikProvider>
        </FlexBetween>
      </Box>

      <FlexBetween
        width
        height={20}
        sx={{
          position: "absolute",
          bottom: "0",
        }}
      >
        <Typography
          variant="p"
          fontSize={"0.8rem"}
          color={theme.palette.primary.main}
          ml={"auto"}
          mr={"2rem"}
        >
          copyright@ 2022
        </Typography>
      </FlexBetween>
    </FlexBetween>
  );
};

export default LoginPage;

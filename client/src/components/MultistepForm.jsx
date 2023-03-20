import { ArrowBack } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, Box, Typography, useTheme, Link } from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { colorToken } from "theme";
import FlexBetween from "./FlexBetween";

const MultistepForm = ({ children, initialValues, onSubmit, isLoading }) => {
  const [stepNumber, setStepNumber] = useState(0);
  const steps = React.Children.toArray(children);
  const [snapshot, setSnapshot] = useState(initialValues);
  const theme = useTheme();
  const mode = useSelector((state) => state.persistedReducer.user.mode);

  const stepObject = steps[stepNumber];
  const step = stepObject.props.children;
  const totalStep = steps.length;
  const isLastStep = stepNumber === totalStep - 1;

  const next = (values) => {
    setSnapshot(values);
    setStepNumber(stepNumber + 1);
  };
  const previous = () => {
    setStepNumber(stepNumber - 1);
  };

  const HandleSubmit = async (values, actions) => {
    if (step.props.onSubmit) {
      await step.props.onSubmit(values);
    }
    if (isLastStep) {
      return onSubmit(values, actions);
    } else {
      actions.setTouched({});
      next(values);
    }
  };

  const formik = useFormik({
    initialValues: snapshot,
    validationSchema: step.props.validationSchema,
    onSubmit: HandleSubmit,
  });

  return (
    <FormikProvider value={formik}>
      <Form>
        <Box
          sx={{
            height: "4rem",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: stepNumber === 0 ? "center" : "flex-start",
            marginBottom: "2rem",
          }}
        >
          {stepNumber > 0 ? (
            <Button onClick={() => previous()}>
              <ArrowBack
                sx={{
                  cursor: "pointer",
                  height: "100%",
                  widht: "max-content",
                  color: theme.palette.primary.main,
                }}
              />
            </Button>
          ) : (
            <Typography
              variant="h3"
              fontSize={"2.2rem"}
              fontWeight={"600"}
              color={theme.palette.neutral.main}
            >
              Sign up to SocialPedia
            </Typography>
          )}
        </Box>
        {step}
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            justifyContent: "flex-end",
            width: "95%",
            margin: "1rem auto",
          }}
        >
          {stepNumber === 0 && (
            <FlexBetween my={2}>
              <Link href="/login" variant="body2" fontSize={"1.6rem"}>
                Already have an account? Sign in
              </Link>
            </FlexBetween>
          )}

          <LoadingButton
            loading={isLoading ? true : false}
            loadingPosition="end"
            type="submit"
            variant="contained"
            sx={{
              marginTop: isLastStep ? "1rem" : "0",
              color: isLastStep ? "primary" : theme.palette.neutral.main,
              background: isLastStep
                ? "primary"
                : mode === "light"
                ? colorToken.greyColors[25]
                : colorToken.greyColors[75],
              "&:hover": {
                background: isLastStep
                  ? "primary"
                  : mode === "light"
                  ? colorToken.greyColors[10]
                  : colorToken.greyColors[90],
              },
            }}
          >
            <span>{isLastStep ? "Submit" : "Next"}</span>
          </LoadingButton>
        </Box>
      </Form>
    </FormikProvider>
  );
};

export default MultistepForm;

export const FormStep = ({ stepName = "", children }) => children;

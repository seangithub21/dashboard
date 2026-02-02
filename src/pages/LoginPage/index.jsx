import { Box, Typography, useTheme } from "@mui/material";
import { Field, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import Button from "components/common/Button";
import Input from "components/common/Input";

import getStyles from "./styles";

const initialValues = { email: "", password: "" };

const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .matches(`${process.env.REACT_APP_EMAIL}`, "Incorrect email"),
  password: Yup.string()
    .required("Password is a requred field")
    .min(8, "Password should be 8 symbols at least")
    .matches(`${process.env.REACT_APP_PASSWORD}`, "Incorrect password"),
});

const LoginPage = () => {
  const theme = useTheme();
  const classes = getStyles({ theme });
  const navigate = useNavigate();

  const onSubmit = (data) => {
    localStorage.setItem("user", "user");
    navigate("/stocks");
  };

  return (
    <Box sx={classes.container}>
      <Box sx={classes.formContainer}>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={schema}
          onSubmit={onSubmit}
        >
          {({ errors, handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Box sx={classes.form}>
                  <Box>
                    <Typography variant="h6" sx={classes.logo}>
                      Stock Logo
                    </Typography>
                    <Typography variant="h6" sx={classes.createdBy}>
                      ©2023 - 2026 Fam. UA
                    </Typography>
                  </Box>
                  <Box sx={classes.inputsContainer}>
                    <Field name="email">
                      {(props) => (
                        <Input
                          label="Email"
                          helperText={errors.email}
                          error={!!errors.email}
                          {...props}
                        />
                      )}
                    </Field>
                    <Field name="password">
                      {(props) => (
                        <Input
                          label="Password"
                          isPassword
                          helperText={errors.password}
                          error={!!errors.password}
                          {...props}
                        />
                      )}
                    </Field>
                  </Box>
                  <Button type="submit">Log in</Button>
                </Box>
              </form>
            );
          }}
        </Formik>
      </Box>
    </Box>
  );
};

export default LoginPage;

import { Box, Typography } from "@mui/material";
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
    .matches("email", "Type 'email' for now"),
  password: Yup.string()
    .required("Password is a requred field")
    .min(8, "Password should be 8 symbols at least")
    .matches("password", "Just type 'password' for now"),
});

const LoginPage = () => {
  const classes = getStyles();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    localStorage.setItem("user", "user");
    navigate("/stock");
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
                  <Typography variant="h6">Logo</Typography>
                  <Box sx={classes.inputsContainer}>
                    <Field name="email">
                      {(props) => (
                        <Input
                          label="Just type 'email' for now"
                          helperText={errors.email}
                          error={!!errors.email}
                          {...props}
                        />
                      )}
                    </Field>
                    <Field name="password">
                      {(props) => (
                        <Input
                          label="Type 'password'"
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

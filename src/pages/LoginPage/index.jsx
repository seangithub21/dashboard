import { Box, Typography } from "@mui/material";
import { Field, Formik } from "formik";
import { useNavigate } from "react-router-dom";

import Button from "components/common/Button";
import Input from "components/common/Input";

import getStyles from "./styles";

const initialValues = { email: "", password: "" };

const LoginPage = () => {
  const classes = getStyles();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // localStorage.setItem("user", "user");
    // navigate("/home");
    console.log("data: ", data);
  };

  return (
    <Box sx={classes.container}>
      <Box sx={classes.formContainer}>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={onSubmit}
        >
          {({ handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Box sx={classes.form}>
                  <Typography variant="h6">Logo</Typography>
                  <Field name="email">
                    {(props) => <Input label="Email" {...props} />}
                  </Field>
                  <Field name="password">
                    {(props) => <Input label="Password" {...props} />}
                  </Field>
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

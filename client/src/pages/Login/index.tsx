import { Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MainForm } from "../../components/helper/MainForm";
import { graphqlClient } from "../../graphql/client";
import { useLoginMutation } from "../../graphql/generated";

interface LoginPageProps {}

export const LoginPage: React.FC<LoginPageProps> = ({}) => {
  const navigate = useNavigate();
  const [loginFormState, setLoginFormState] = useState({
    email: "",
    password: "",
  });
  const [loginFormErrors, setLoginFormErrors] = useState({
    email: "",
    password: "",
  });

  const { mutateAsync: login, isLoading: loginIsLoading } =
    useLoginMutation(graphqlClient);

  const onLoginFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoginFormErrors({
      email: "",
      password: "",
    });

    const data = await login({
      input: { ...loginFormState },
    });

    if (data?.login?.error) {
      return setLoginFormErrors({
        ...loginFormErrors,
        [data.login.error.field]: data.login.error.ufm,
      });
    }

    navigate("/");
  };

  return (
    <MainForm
      title="Sign In"
      button={loginIsLoading ? "Logining..." : "Login"}
      onSubmit={onLoginFormSubmit}
      fields={[
        {
          label: "Email",
          value: loginFormState.email,
          error: loginFormErrors.email,
          onChange: (e) =>
            setLoginFormState({
              ...loginFormState,
              email: e.target.value,
            }),
        },
        {
          label: "Password",
          value: loginFormState.password,
          error: loginFormErrors.password,
          type: "password",
          onChange: (e) =>
            setLoginFormState({
              ...loginFormState,
              password: e.target.value,
            }),
        },
      ]}
    >
      <Typography variant="subtitle2" marginTop="1rem">
        Don't have an account? <Link to="/account/register">Sign up</Link>
      </Typography>
    </MainForm>
  );
};

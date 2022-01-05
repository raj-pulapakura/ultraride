import { Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SimpleForm } from "../../shared/SimpleForm";
import { graphqlClient } from "../../graphql/client";
import { useLoginMutation } from "../../graphql/generated";
import { FormContainer } from "../../shared/FormContainer";
import { FormSubmitButton } from "../../shared/FormSubmitButton";
import { FormTitle } from "../../shared/FormTitle";
import { SimpleFormControl } from "../../shared/SimpleFormControl";

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
    <FormContainer>
      <form onSubmit={onLoginFormSubmit}>
        <FormTitle>Sign In</FormTitle>
        <SimpleFormControl
          value={loginFormState.email}
          onChange={(e) =>
            setLoginFormState({
              ...loginFormState,
              email: e.target.value,
            })
          }
          label="Email"
          type="email"
          error={loginFormErrors.email}
        />
        <SimpleFormControl
          value={loginFormState.password}
          onChange={(e) =>
            setLoginFormState({
              ...loginFormState,
              password: e.target.value,
            })
          }
          label="Password"
          error={loginFormErrors.password}
        />
        <FormSubmitButton>
          {loginIsLoading ? "Signing in..." : "Sign In"}
        </FormSubmitButton>

        <Typography variant="subtitle2" marginTop="1rem">
          Don't have an account? <Link to="/account/register">Register</Link>
        </Typography>
      </form>
    </FormContainer>
  );
};

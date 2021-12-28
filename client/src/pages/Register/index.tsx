import { Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { MainForm } from "../../components/helper/MainForm";
import { graphqlClient } from "../../graphql/client";
import { useCreateAccountMutation } from "../../graphql/generated";

interface RegisterPageProps {}

export const RegisterPage: React.FC<RegisterPageProps> = ({}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const [registerFormState, setRegisterFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [registerFormErrors, setRegisterFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { mutateAsync: createAccount, isLoading: createAccountIsLoading } =
    useCreateAccountMutation(graphqlClient);

  const onRegisterFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setRegisterFormErrors({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });

    const data = await createAccount({
      input: { ...registerFormState, role: "consumer" },
    });

    if (data?.createAccount?.error) {
      return setRegisterFormErrors({
        ...registerFormErrors,
        [data.createAccount.error.field]: data.createAccount.error.ufm,
      });
    }

    const next = query.get("next");
    if (next) {
      return navigate("/" + next);
    }

    navigate("/");
  };

  return (
    <MainForm
      title="Create an account"
      button={createAccountIsLoading ? "Registering..." : "Register"}
      onSubmit={onRegisterFormSubmit}
      fields={[
        {
          label: "First Name",
          value: registerFormState.firstName,
          error: registerFormErrors.firstName,
          onChange: (e) =>
            setRegisterFormState({
              ...registerFormState,
              firstName: e.target.value,
            }),
        },
        {
          label: "Last Name",
          value: registerFormState.lastName,
          error: registerFormErrors.lastName,
          onChange: (e) =>
            setRegisterFormState({
              ...registerFormState,
              lastName: e.target.value,
            }),
        },
        {
          label: "Email",
          value: registerFormState.email,
          error: registerFormErrors.email,
          onChange: (e) =>
            setRegisterFormState({
              ...registerFormState,
              email: e.target.value,
            }),
        },
        {
          label: "Password",
          value: registerFormState.password,
          error: registerFormErrors.password,
          onChange: (e) =>
            setRegisterFormState({
              ...registerFormState,
              password: e.target.value,
            }),
        },
      ]}
    >
      <Typography variant="subtitle2" marginTop="1rem">
        Already have an account? <Link to="/login">Sign in</Link>
      </Typography>
    </MainForm>
  );
};

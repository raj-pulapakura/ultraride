import { Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { SimpleForm } from "../../shared/SimpleForm";
import { graphqlClient } from "../../graphql/client";
import { useRegisterMutation } from "../../graphql/generated";
import { FormContainer } from "../../shared/FormContainer";
import { FormSubmitButton } from "../../shared/FormSubmitButton";
import { FormTitle } from "../../shared/FormTitle";
import { SimpleFormControl } from "../../shared/SimpleFormControl";

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
    useRegisterMutation(graphqlClient);

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

    if (data?.register?.error) {
      return setRegisterFormErrors({
        ...registerFormErrors,
        [data.register.error.field]: data.register.error.ufm,
      });
    }

    const next = query.get("next");
    if (next) {
      return navigate("/" + next);
    }

    navigate("/");
  };

  return (
    <FormContainer>
      <form onSubmit={onRegisterFormSubmit}>
        <FormTitle>Create an Account</FormTitle>
        <SimpleFormControl
          value={registerFormState.firstName}
          onChange={(e) =>
            setRegisterFormState({
              ...registerFormState,
              firstName: e.target.value,
            })
          }
          label="First Name"
          error={registerFormErrors.firstName}
        />
        <SimpleFormControl
          value={registerFormState.lastName}
          onChange={(e) =>
            setRegisterFormState({
              ...registerFormState,
              lastName: e.target.value,
            })
          }
          label="Last Name"
          error={registerFormErrors.lastName}
        />
        <SimpleFormControl
          value={registerFormState.email}
          onChange={(e) =>
            setRegisterFormState({
              ...registerFormState,
              email: e.target.value,
            })
          }
          label="Email"
          type="email"
          error={registerFormErrors.email}
        />
        <SimpleFormControl
          value={registerFormState.password}
          onChange={(e) =>
            setRegisterFormState({
              ...registerFormState,
              password: e.target.value,
            })
          }
          label="Password"
          type="password"
          error={registerFormErrors.password}
        />
        <FormSubmitButton>
          {createAccountIsLoading ? "Registering..." : "Register"}
        </FormSubmitButton>

        <Typography variant="subtitle2" marginTop="1rem">
          Already have an account? <Link to="/account/sign-in">Sign in</Link>
        </Typography>
      </form>
    </FormContainer>
  );
};

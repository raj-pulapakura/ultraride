import React, { useState } from "react";
import { graphqlClient } from "../../graphql/client";
import { useAdminLoginMutation } from "../../graphql/generated";
import { SimpleForm } from "../../components/forms/SimpleForm";

interface AdminLoginFormProps {}

export const AdminLoginForm: React.FC<AdminLoginFormProps> = ({}) => {
  const [adminFormState, setAdminFormState] = useState({
    adminId: "",
    adminPassword: "",
  });
  const [adminFormErrors, setAdminFormErrors] = useState({
    adminId: "",
    adminPassword: "",
  });

  const { mutateAsync: adminLogin, isLoading: adminLoginIsLoading } =
    useAdminLoginMutation(graphqlClient);

  const onAdminFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setAdminFormErrors({
      adminId: "",
      adminPassword: "",
    });

    const data = await adminLogin({
      input: { ...adminFormState },
    });

    if (!data.adminLogin) {
      return setAdminFormErrors({
        adminId: "Incorrect admin id",
        adminPassword: "Incorrect admin password",
      });
    }
  };

  return (
    <SimpleForm
      title="Login as Admin"
      button={adminLoginIsLoading ? "Logging In..." : "Log In"}
      onSubmit={onAdminFormSubmit}
      fields={[
        {
          label: "Admin ID",
          value: adminFormState.adminId,
          error: adminFormErrors.adminId,
          onChange: (e) =>
            setAdminFormState({
              ...adminFormState,
              adminId: e.target.value,
            }),
        },
        {
          label: "Admin Password",
          value: adminFormState.adminPassword,
          error: adminFormErrors.adminPassword,
          onChange: (e) =>
            setAdminFormState({
              ...adminFormState,
              adminPassword: e.target.value,
            }),
        },
      ]}
    ></SimpleForm>
  );
};

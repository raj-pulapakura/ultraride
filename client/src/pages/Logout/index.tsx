import { Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { SimpleContainer } from "../../components/helper/SimpleContainer";
import { graphqlClient } from "../../graphql/client";
import { useLogoutMutation, useGetMeQuery } from "../../graphql/generated";

interface LogoutPageProps {}

export const LogoutPage: React.FC<LogoutPageProps> = ({}) => {
  const { data: meData } = useGetMeQuery(graphqlClient);

  const { mutateAsync: logout, isLoading: logoutIsLoading } =
    useLogoutMutation(graphqlClient);

  const navigate = useNavigate();

  const onLogoutButtonClick = async () => {
    await logout({}, {});
    navigate("/");
  };

  return (
    <>
      <SimpleContainer>
        <Typography variant="h6" textAlign="center">
          {`Are you sure you want to logout, ${meData?.getMe?.account?.firstName}?`}
        </Typography>
      </SimpleContainer>
      <Button
        variant="contained"
        fullWidth
        sx={{ marginTop: "1rem" }}
        onClick={onLogoutButtonClick}
      >
        {logoutIsLoading ? "Signing out..." : "Logout"}
      </Button>
    </>
  );
};

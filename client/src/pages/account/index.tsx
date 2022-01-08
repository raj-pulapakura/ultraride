import { Button, ButtonGroup, Typography } from "@mui/material";
import React from "react";
import { CenterContainer } from "../../shared/CenterContainer";
import { SimpleContainer } from "../../shared/SimpleContainer";
import { graphqlClient } from "../../graphql/client";
import { useMeQuery, useLogoutMutation } from "../../graphql/generated";
import { useNavigate } from "react-router-dom";

interface AccountProps {}

export const AccountPage: React.FC<AccountProps> = ({}) => {
  const { data: meData } = useMeQuery(graphqlClient);

  const userIsLoggedIn = !!meData?.me?.account;
  const navigate = useNavigate();

  const { mutateAsync: logout } = useLogoutMutation(graphqlClient);

  const onCreateAnAccountButtonClick = () => {
    navigate("/account/sign-up");
  };

  const onSignInButtonClick = () => {
    navigate("/account/sign-in");
  };

  const onLogoutButtonClick = async () => {
    const proceed = window.confirm("Are you sure you want to logout?");
    if (proceed) {
      await logout({});
      navigate("/");
    }
  };

  const memberJoined = new Date(
    parseInt(meData?.me?.account?.createdAt || "1")
  );

  return (
    <CenterContainer>
      {userIsLoggedIn ? (
        <>
          <SimpleContainer>
            <Typography variant="h6">ACCOUNT DETAILS</Typography>
            <Typography sx={{ marginTop: "1rem" }}>
              Name: {meData.me?.account?.firstName}{" "}
              {meData?.me?.account?.lastName}
            </Typography>
            <Typography>Email: {meData.me?.account?.email}</Typography>{" "}
            <Typography>
              Member since:{" "}
              {meData?.me?.account?.createdAt
                ? `${memberJoined.getDate()}/${memberJoined.getMonth()}/${memberJoined.getFullYear()}`
                : "Loading..."}
            </Typography>
            <Button
              variant="contained"
              onClick={onLogoutButtonClick}
              sx={{ marginTop: "1rem" }}
            >
              Logout
            </Button>
          </SimpleContainer>
        </>
      ) : (
        <>
          <SimpleContainer>
            <>
              <Typography variant="h4">You are not logged in.</Typography>
              <Typography sx={{ color: "grey", marginTop: "1rem" }}>
                If you do not log in now, you will be prompted to do so when you
                checkout.
              </Typography>
              <ButtonGroup
                sx={{ display: "block", marginTop: "2rem", width: "100%" }}
              >
                <Button
                  variant="contained"
                  onClick={onCreateAnAccountButtonClick}
                  sx={{ width: "50%" }}
                >
                  Sign Up
                </Button>
                <Button onClick={onSignInButtonClick} sx={{ width: "50%" }}>
                  Sign In
                </Button>
              </ButtonGroup>
            </>
          </SimpleContainer>
        </>
      )}
    </CenterContainer>
  );
};

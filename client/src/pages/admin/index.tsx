import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { graphqlClient } from "../../graphql/client";
import { useAdminMeQuery } from "../../graphql/generated";
import { ProductTable } from "../../providers/admin/ProductTable";
import { AdminLoginForm } from "../../providers/admin/AdminLoginForm";
import { AccountTable } from "../../providers/admin/AccountTable";
import { CollapseField } from "../../shared/CollapseField";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

interface AdminPageProps {}

export const AdminPage: React.FC<AdminPageProps> = ({}) => {
  const navigate = useNavigate();
  const { data: adminMeData } = useAdminMeQuery(
    graphqlClient,
    {},
    { refetchInterval: 1000 }
  );
  const adminIsLoggedIn = !!adminMeData?.adminMe;

  return adminIsLoggedIn ? (
    <>
      <Typography variant="h2" fontWeight="bold" marginBottom="0.75rem">
        ADMIN ZONE
      </Typography>
      <Typography color={grey[600]}>
        Please acknowledge that changes made on the admin page are permanent and
        immediately affect the consumer side of the website.
      </Typography>
      <Button
        variant="contained"
        sx={{ marginTop: "2rem" }}
        onClick={() => {
          navigate("create-product");
        }}
      >
        List a new Product
      </Button>
      <CollapseField title="View Products" sx={{ marginTop: "2rem" }}>
        <ProductTable />
      </CollapseField>
      <CollapseField title="View Members" sx={{ marginTop: "1rem" }}>
        <AccountTable />
      </CollapseField>
    </>
  ) : (
    <AdminLoginForm />
  );
};

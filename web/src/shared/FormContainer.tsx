import React from "react";
import { CenterContainer } from "./CenterContainer";

interface FormContainerProps {}

export const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
  return <CenterContainer marginTop="2rem">{children}</CenterContainer>;
};

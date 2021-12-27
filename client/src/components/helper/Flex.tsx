import React from "react";

type FlexProps = React.HTMLAttributes<HTMLDivElement>;

export const Flex: React.FC<FlexProps> = ({ children, ...props }) => {
  return (
    <div
      {...props}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
};

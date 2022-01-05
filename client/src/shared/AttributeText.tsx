import { Typography } from "@mui/material";

interface AttributeTextProps {
  label: string;
  value: string;
}

export const AttributeText: React.FC<AttributeTextProps> = ({
  label,
  value,
}) => {
  return (
    <Typography sx={{ marginBottom: "0.5rem" }}>
      <span style={{ fontWeight: "bold" }}>{label}</span>: {value}
    </Typography>
  );
};

import { makeStyles } from "@mui/styles";

export const useSingleProductStyles = makeStyles({
  product: {
    display: "flex",
    position: "relative",
    borderRadius: "1rem",
    flexDirection: "column",
    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.25)",
    "&:hover": {
      cursor: "pointer",
    },
    height: "100%",
  },
  productImage: {
    width: "100%",
  },
});

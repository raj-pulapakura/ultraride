import { makeStyles } from "@mui/styles";

export const useSearchBarStyles = makeStyles({
  searchBar: {
    display: "flex",
    background: "white",
    borderRadius: "5rem",
    padding: "0rem 1rem",
  },
  searchBarInput: {
    border: "none",
    outline: "none",
    borderRadius: "5rem",
    flexGrow: 1,
    background: "inherit",
    fontFamily: "Work Sans",
    fontWeight: "bold",
    color: "grey",
  },
  searchBarIcon: {},
});

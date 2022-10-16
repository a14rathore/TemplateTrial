import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
// import InputBase from "@mui/material/InputBase";
// import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import SortIcon from "@mui/icons-material/Sort";
import { IconButton } from "@mui/material";
import SearchForm from "../../SearchForm.js/SearchForm";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  // "&:hover": {
  //   backgroundColor: alpha(theme.palette.common.white, 0.25),
  // },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     color: "black",
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("md")]: {
//       width: "20ch",
//     },
//   },
// }));

export default function SearchBar({ setSearchPramas }) {
  const [showSerchForm, setShowSearchForm] = React.useState(false);

  return (
    <>
      <Box sx={{ flexGrow: 1, mt: 1 }}>
        <AppBar position="static" sx={{ bgcolor: "#2d6eae" }}>
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <h1>Line List</h1>
              {/* <Search sx={{ bgcolor: "#d7e9f8", maxWidth: 569 }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search> */}
            </Box>
            <Box>
              <IconButton
                sx={{ border: "2px solid #fff", mr: 1 }}
                onClick={() => setShowSearchForm(!showSerchForm)}
              >
                {!showSerchForm ? (
                  <FilterAltIcon sx={{ color: "#fff" }} />
                ) : (
                  <FilterAltOffIcon sx={{ color: "#fff" }} />
                )}
              </IconButton>
              <IconButton sx={{ border: "2px solid #FFF" }}>
                <SortIcon sx={{ color: "#fff" }} />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        sx={{
          m: 1,
          mt: 2,
          mb: 5,
          bgcolor: "green",
          boxShadow: "0 0px 19px -10px black",
        }}
      >
        {showSerchForm && (
          <SearchForm listing setSearchPramas={setSearchPramas} />
        )}
      </Box>
    </>
  );
}

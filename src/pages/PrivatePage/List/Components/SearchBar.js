import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import SortIcon from "@mui/icons-material/Sort";
import { IconButton } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

export default function SearchBar({ setSearchPramas }) {
  const [showSerchForm, setShowSearchForm] = React.useState(false);

  return (
    <>
      <Box sx={{ flexGrow: 1, mt: 1 }}>
        <AppBar position="static" sx={{ bgcolor: "#2d6eae" }}>
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <h1>Line List</h1>
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
    </>
  );
}

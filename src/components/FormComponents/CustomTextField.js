import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomTextFiled = styled(TextField)({
  "& label.Mui-focused": {
    color: "blue",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "&": {
    background: "#ffffff",
    borderRadius: "8px",
    width: "100%",
    maxWidth: "369px",
  },
  "& input": { WebkitBoxShadow: "0 0 0 1000px white inset" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "1px solid #6d9dec",
      borderRadius: "8px",
    },
    "&:hover fieldset": {
      borderColor: "#6d9dec",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6d9dec",
    },
  },
});

export default CustomTextFiled;

import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const CustomInputText = styled(TextField)({
  "&": {
    width: "100%",
    maxWidth: "273px",
  },
  "& label": {
    marginLeft: "-10px",
  },
  "& input": {
    width: "100%",
    WebkitBoxShadow: "0 0 0 1000px white inset",
  },
  "& input:valid + fieldset": {
    border: "none",
    borderBottom: "3px solid #c2e9f8",
  },
  "& .MuiOutlinedInput-root:hover fieldset": {
    borderColor: "#c2e9f8",
  },
  "& input:invalid + fieldset": {
    borderColor: "red",
    borderWidth: 2,
  },
  "& input:valid:focus + fieldset": {
    borderLeftWidth: 6,
    padding: "4px !important", // override inline-style
  },
});

export default CustomInputText;

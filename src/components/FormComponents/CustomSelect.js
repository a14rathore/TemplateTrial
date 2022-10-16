import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";

const StylesSelect = styled(Select)({
  "& fieldset": {
    border: "1px solid #6d9dec ",
    borderRadius: 8,
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#6d9dec ",
  },
});

export default function CustomSelect({
  name,
  options,
  value,
  onChange,
  onBlur,
}) {
  return (
    <div>
      <FormControl
        sx={{
          width: "100%",
          maxWidth: 369,
          borderRadius: 2,
        }}
      >
        <StylesSelect
          name={name}
          onBlur={onBlur}
          value={value}
          onChange={onChange}
        >
          <MenuItem>
            <em>Select</em>
          </MenuItem>
          {options.map((val) => (
            <MenuItem value={val.code} key={val.code}>
              {val.name}
            </MenuItem>
          ))}
        </StylesSelect>
      </FormControl>
    </div>
  );
}

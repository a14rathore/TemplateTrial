import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import React from "react";

function Date({ type, name, formik }) {
  const [value, setValue] = React.useState();

  const handleChange = (newValue) => {
    setValue(newValue);
    formik.setFieldValue(name, newValue);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {type === "DATE" && (
        <MobileDatePicker
          label="Date mobile"
          inputFormat="MM/dd/yyyy"
          name={name}
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      )}
      {type === "TIME" && (
        <TimePicker
          name={name}
          id={name}
          label="Time"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      )}
      {type === "DATETIME" && (
        <DateTimePicker
          name={name}
          id={name}
          label="Date&Time picker"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      )}
    </LocalizationProvider>
  );
}

export default Date;

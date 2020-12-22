import React, { useState } from "react";
import LuxonUtils from "@date-io/luxon";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";


function KeyboardDatePickerTab(props) {

  return (
    <MuiPickersUtilsProvider utils={LuxonUtils}>
      <KeyboardDatePicker
        id="key-datepicker"
        clearable
        value={props.selectedDate}
        onChange={(date) => props.handleDateChange(date)}
        minDate={new Date()}
        format="yyyy-MM-dd"
      />
    </MuiPickersUtilsProvider>
  );
}

export default KeyboardDatePickerTab;

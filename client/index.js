import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import history from "./history";
import store from "./store";
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon'

ReactDOM.render(
  
  <Provider store={store}>
    <Router history={history}>
    <MuiPickersUtilsProvider utils={LuxonUtils}>
      <App />
      </MuiPickersUtilsProvider>
    </Router>
  </Provider>,
  document.getElementById("app")
);


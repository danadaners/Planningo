import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import {
  UserHome,
  Login,
  Signup,
  Account,
  AccountSettings,
  ShoppingList,
  AppCalendar,
  TaskList,
  Planningo,
  CreateGroup,
  MyGroup,
  Rewards
} from "./components";
import { me } from "./store";

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, hasGroup } = this.props;
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/about" component={Planningo} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path={["/home", "/"]}>
              {!hasGroup ? <Redirect to="/group" /> : <UserHome />}
            </Route>
            <Route exact path="/account" component={Account} />
            <Route exact path="/account/settings" component={AccountSettings} />
            <Route path="/calendar" component={AppCalendar} />
            <Route exact path="/tasks" component={TaskList} />
            <Route path="/shoppinglist" component={ShoppingList} />
            <Route exact path="/group" component={MyGroup} />
            <Route exact path="/group/new">
              {hasGroup ? <Redirect to="/group" /> : <CreateGroup/>}
            </Route>
            <Route exact path="/rewards" component={Rewards} />
          </Switch>
        )}

        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    hasGroup: !!state.user.groupId,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  hasGroup: PropTypes.bool.isRequired,
};

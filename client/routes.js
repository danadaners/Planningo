import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";

import {
  UserHome,
  HomePage,
  Login,
  Signup,
  GroupList,
  Account,
  AccountSettings,
  ShoppingList,
  AppCalendar,
  TaskList,
  CreateGroup,
  SingleGroup,
  GroupShoppingList,
  GroupTaskList,
} from "./components";
import { me } from "./store";

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/welcome" component={HomePage} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}

            <Route exact path={["/home", "/"]} component={UserHome} />
            <Route exact path="/account" component={Account} />
            <Route exact path="/account/settings" component={AccountSettings} />
            <Route path="/calendar" component={AppCalendar} />
            <Route exact path="/tasks" component={TaskList} />
            <Route exact path="/groups" component={GroupList} />
            <Route path="/shoppinglist" component={ShoppingList} />
            <Route
              exact
              path="/:groupId/shoppinglist"
              component={GroupShoppingList}
            />
            <Route exact path="/groups/create" component={CreateGroup} />
            <Route exact path="/groups/:groupId" component={withRouter(SingleGroup)} />

            <Route
              exact
              path="/groups/:groupId/tasks"
              component={GroupTaskList}
            />

            <Route
              path="/groups/:groupId/shoppinglist"
              component={GroupShoppingList}
            />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={HomePage} />
      </Switch>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
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
};

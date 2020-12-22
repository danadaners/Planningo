import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
export const Account = (props) => {
  const { email } = props;

  return (
    <div>
      <h3>My Account</h3>
      <Link to="/account/settings">Account Settings</Link>
      <div>Edit Groups</div>
      <Link to="/mystats">My Stats</Link>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
  };
};

export default connect(mapState)(Account);

/**
 * PROP TYPES
 */
Account.propTypes = {
  email: PropTypes.string,
};

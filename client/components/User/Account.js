import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./account.css";

/**
 * COMPONENT
 */
export const Account = (props) => {
  const { email } = props;

  return (
    <div className="account-page-wrapper">
        <div className="account-header" >MY ACCOUNT</div>
        <div className="account-options">
          <Link to="/account/settings">Account Settings</Link>
          <div>Edit Groups</div>
        </div>
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

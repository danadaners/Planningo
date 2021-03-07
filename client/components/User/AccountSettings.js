import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { me } from "../../store";
import { updateUserThunk, updatePasswordThunk } from "../../store/user";
import { fetchGroupsThunk } from "../../store/allGroups";
import "./accountsettings.css";
import {
  FaEnvelope,
  FaKey,
  FaUserCircle,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

class AccountSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formStatus: false,
    };
    this.toggleFormStatus = this.toggleFormStatus.bind(this);
  }

  componentDidMount() {
    this.props.loadInitialData();
    this.props.fetchGroups(this.props.userId);
  }
  toggleFormStatus() {
    this.setState({ formStatus: !this.state.formStatus });
  }
  handleSubmit(userId, firstName, lastName, email, avatarUrl) {
    this.props.updateUser(userId, firstName, lastName, email, avatarUrl);
  }
  handlePassword(userId, oldPassword, newPassword) {
    this.props.updatePassword(userId, oldPassword, newPassword);
  }

  render() {
    const { user } = this.props;

    return (
      <div className="account-settings-wrapper">
        <div> 
          <div className="account-settings-header">PERSONAL INFO:</div>

          {this.state.formStatus ? (
            <div>
              <div>
              <button className="cancel-edit" onClick={this.toggleFormStatus}><FaArrowLeft/></button>
              </div>
              <form id="edit-profile-form">
                <label htmlFor="name">Icon: </label>
                <input
                  name="avatarUrl"
                  id="avatarUrl"
                  type="text"
                  placeholder={user.avatarUrl}
                  defaultValue={user.avatarUrl}
                />
                <p></p>
                <label htmlFor="name"> Name: </label>
                <input
                  name="firstName"
                  id="firstName"
                  type="text"
                  placeholder={user.firstName}
                  defaultValue={user.firstName}
                />
                <input
                  name="lastName"
                  id="lastName"
                  type="text"
                  placeholder={user.lastName}
                  defaultValue={user.lastName}
                />
                <br />
                <label htmlFor="email"> Email: </label>
                <input
                  name="email"
                  id="email"
                  type="email"
                  placeholder={user.email}
                  defaultValue={user.email}
                />
                <p></p>
                <button
                  className="update-profile"
                  type="button"
                  onClick={() => {
                    this.handleSubmit(
                      user.id,
                      document.getElementById("firstName").value,
                      document.getElementById("lastName").value,
                      document.getElementById("email").value,
                      document.getElementById("avatarUrl").value
                    );
                  }}
                >
                  Update Profile
                </button>
              </form>
              <form id="edit-password-form" onSubmit={this.handlePassword}>
                <label htmlFor="old-password"> Old Password: </label>
                <input
                  name="old-password"
                  id="old-password"
                  type="password"
                  defaultValue={user.password}
                />
                <p></p>
                <label htmlFor="new-password"> New Password: </label>
                <input
                  name="new-password"
                  id="new-password"
                  type="password"
                  defaultValue={user.password}
                />
                {/* <label htmlFor="confirm-password"> Confirm Password: </label>
                <input name="confirm-password" type="password" /> */}
                <p></p>
                <button
                  className="update-password"
                  type="button"
                  onClick={() => {
                    this.handlePassword(
                      user.id,
                      document.getElementById("old-password").value,
                      document.getElementById("new-password").value
                    );
                  }}
                >
                  Update Password
                </button>
              </form>
            </div>
          ) : (
            <div>
              <div className="user-info">
              <p>
                Name: {user.firstName} {user.lastName}
              </p>
              <p>Email: {user.email} </p>
              </div>
              <div>
                <button className="edit-account-button" onClick={this.toggleFormStatus}>Edit</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    groups: state.groups,
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
    updateUser(userId, firstName, lastName, email, avatarUrl) {
      dispatch(updateUserThunk(userId, firstName, lastName, email, avatarUrl));
    },
    updatePassword(userId, oldPassword, newPassword) {
      dispatch(updatePasswordThunk(userId, oldPassword, newPassword));
    },
    fetchGroups: (userId) => dispatch(fetchGroupsThunk(userId)),
  };
};

export default connect(mapState, mapDispatch)(AccountSettings);

AccountSettings.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
};

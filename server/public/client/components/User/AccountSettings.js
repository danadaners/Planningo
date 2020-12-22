import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { me } from "../../store";
import { updateUserThunk, updatePasswordThunk } from "../../store/user";

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
      <div>
        <div>
          <h3>Personal Info:</h3>

          {this.state.formStatus ? (
            <div>
              <button onClick={this.toggleFormStatus}>Cancel Edit</button>
              <form id="edit-profile-form">
                <label htmlFor="name">Icon: </label>
                <input
                  name="avatarUrl"
                  id="avatarUrl"
                  type="text"
                  placeholder={user.avatarUrl}
                  defaultValue={user.avatarUrl}
                />
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
                <label htmlFor="new-password"> New Password: </label>
                <input
                  name="new-password"
                  id="new-password"
                  type="password"
                  defaultValue={user.password}
                />
                {/* <label htmlFor="confirm-password"> Confirm Password: </label>
                <input name="confirm-password" type="password" /> */}
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
              <button onClick={this.toggleFormStatus}>Edit</button>
              <p>
                Name: {user.firstName} {user.lastName}
              </p>
              <p>Email: {user.email} </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
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
  };
};

export default connect(mapState, mapDispatch)(AccountSettings);

AccountSettings.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
};

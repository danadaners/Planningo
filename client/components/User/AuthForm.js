import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { auth } from "../../store";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import "./authform.css";
import LazyLoad from "react-lazy-load"

import {
  FaEnvelope,
  FaKey,
  FaUserCircle,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

class AuthForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: "/assets/icons/users/002-girl.png",
    };
  }

  render() {
    const { name, displayName, handleSubmit, error } = this.props;
    const array = [
      "001-girl",
      "002-girl",
      "003-man",
      "004-boy",
      "005-boy",
      "006-boy",
      "007-woman",
      "008-businessman",
      "009-businessman",
      "013-woman",
      "014-grandfather",
      "015-man",
      "016-hipster",
      "017-man",
      "018-man",
      "019-man",
      "020-delivery man",
      "021-man",
      "022-man",
      "023-man",
      "024-man",
      "025-woman",
      "026-woman",
      "027-grandmother",
      "028-girl",
      "029-girl",
      "030-woman",
      "031-rockstar",
      "032-businesswoman",
      "033-woman",
      "034-woman",
      "035-woman",
      "036-woman",
    ];
    const images = array.map((image) => {
      return (
        <LazyLoad key={image} width={80} height={80}>
        <img
          src={`/assets/icons/users/${image}.png`}
          className={
            this.state.selected === `/assets/icons/users/${image}.png`
              ? "pick-avatar selected"
              : "pick-avatar"
          }
          onClick={() => {
            this.setState({ selected: `/assets/icons/users/${image}.png` });
          }}
          value={image}
        />
        </LazyLoad>
      );
    });

    return (
      <div className="forms">
        <div className="form-container">
          <div className="form-info">
            <form onSubmit={handleSubmit} name={name}>
              <h1 id="authtitle">{displayName}</h1>
              {displayName != "Login" ? (
                <div>
                  <div className="form-input">
                    <label htmlFor="firstName">
                      <small className="form-names">
                        <div className="form-icon">
                          <FaUserCircle/>
                        </div>
                      </small>
                    </label>
                    <input
                      className="info-input"
                      name="firstName"
                      type="text"
                      placeholder="First name"
                      required
                    />
                  </div>

                  <div className="form-input">
                    <label htmlFor="lastName">
                      <small className="form-names">
                        <div className="form-icon">
                          <FaUserCircle/>
                        </div>
                      </small>
                    </label>
                    <input
                      className="info-input"
                      name="lastName"
                      type="text"
                      placeholder="Last name"
                      required
                    />
                  </div>
                </div>
              ) : null}
              <div className="form-input">
                <label htmlFor="email">
                  <small className="form-names">
                    <div className="form-icon">
                      <FaEnvelope/>
                    </div>
                  </small>
                </label>
                <input
                  className="info-input"
                  name="email"
                  placeholder="Email address"
                  type="text"
                  required
                />
              </div>
              <div className="form-input">
                <label htmlFor="password">
                  <small className="form-names">
                    <div className="form-icon">
                      <FaKey/>
                    </div>
                  </small>
                </label>
                <input
                  className="info-input"
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>

              {displayName != "Login" ? (
                <div className="image-pick">
                  <label htmlFor="avatarUrl">
                    <div id="chooser-title">
                      <div className="form-icon">
                        <FaArrowLeft/>
                      </div>
                      Choose Icon
                      <div className="form-icon">
                        <FaArrowRight/>
                      </div>
                    </div>
                  </label>
                  <div id="image-picker-box">{images}</div>
                  <input
                    name="avatarUrl"
                    className="hide-url"
                    value={this.state.selected}
                    readOnly={true}
                  />
                </div>
              ) : null}

              <div id="button-wrap">
                <button className="form-button" type="submit">
                  {displayName}
                </button>
              </div>
            </form>
            <h4>
              {error && error.response && <div> {error.response.data} </div>}
            </h4>
          </div>
          <div id="auth-link-container">
            <a href="/auth/google">{displayName} with Google</a>
            <div id="login-or-signup">
              {displayName === "Login" ? (
                <div>
                  No account? <Link to="/signup">Sign Up</Link>
                </div>
              ) : (
                <div>
                  Have an account? <Link to="/login">Login</Link>
                </div>
              )}
            </div>
          </div>
          <Link to="/about">New To Planningo?</Link>
        </div>
      </div>
    );
  }
}

const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.user.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.user.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;

      if (formName === "login") {
        const email = evt.target.email.value;
        const password = evt.target.password.value;
        dispatch(auth(email, password, formName));
      } else if (formName === "signup") {
        const email = evt.target.email.value;
        const password = evt.target.password.value;
        const firstName = evt.target.firstName.value;
        const lastName = evt.target.lastName.value;
        const avatarUrl = evt.target.avatarUrl.value;
        dispatch(
          auth(email, password, formName, firstName, lastName, avatarUrl)
        );
      }
    },
  };
};

export const Login = withRouter(connect(mapLogin, mapDispatch)(AuthForm));
export const Signup = withRouter(connect(mapSignup, mapDispatch)(AuthForm));

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
};

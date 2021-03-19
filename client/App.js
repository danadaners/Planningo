import React from "react";
import { TopNav, SideNav } from "./components";
import Routes from "./routes";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./App.css";
import { FaTimes } from "react-icons/fa";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sideNavOpen: false,
    };
    this.toggleSideNav = this.toggleSideNav.bind(this);
  }

  toggleSideNav() {
    this.setState({ sideNavOpen: !this.state.sideNavOpen });
  }

  render() {
    const { isLoggedIn, hasGroup } = this.props;

    return (
      <div className="app-wrap">
        {isLoggedIn && hasGroup ? (
          <div id="topnav">
            <TopNav
              toggleSideNav={this.toggleSideNav}
              sideNavOpen={this.state.sideNavOpen}
            />
          </div>
        ) : null}

        <div id="sitebody">
          <div
            className={`sidenav ${
              this.state.sideNavOpen && isLoggedIn && hasGroup
                ? "open"
                : "closed"
            }`}
          >
            <div id="open-close" onClick={this.toggleSideNav}>
              <FaTimes />
            </div>
            <SideNav
              toggleSideNav={this.toggleSideNav}
              sideNavOpen={this.state.sideNavOpen}
            />
          </div>
          <div id="app-content-wrap">
            <Routes />
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    hasGroup: !!state.user.groupId,
  };
};

export default connect(mapState, null)(App);

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  hasGroup: PropTypes.bool.isRequired,
};

import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store";
import PropTypes from "prop-types";
import "./sidenav.css";
import { fetchSingleGroup } from "../../store/singleGroup";

class SideNav extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.fetchGroup(this.props.user.groupId);
    }
  }

  render() {
    let { user, group, handleClick, toggleSideNav } = this.props;
    return (
      <div className="side-nav-wrapper">
        <div id="nav-user-wrap">
          <div id="user-nav">
            <Link to="/account" onClick={toggleSideNav}>
              <img
                src={user.avatarUrl}
                id="user-icon"
                style={{ backgroundColor: user.color }}
                width={80}
                height={80}
              ></img>
            </Link>
            {user.firstName} {user.lastName}
          </div>

          <h4 className="nav-tool-title"> {group ? group.name : null}</h4>
        </div>
        <div className="nav-user-links-wrap">
          <div className="nav-user-links b">
            <Link to="/rewards" onClick={toggleSideNav}>
              Rewards
            </Link>
          </div>
          <div className="nav-user-links a">
            <Link to="/group" onClick={toggleSideNav}>
              Group Settings
            </Link>
          </div>
          <div className="nav-user-links b">
            <a href="#" onClick={handleClick}>
              logout
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  user: state.user,
  isLoggedIn: !!state.user.id,
  group: state.singleGroup,
});

const mapDispatch = (dispatch) => ({
  fetchGroup: (groupId) => dispatch(fetchSingleGroup(groupId)),
  handleClick: () => dispatch(logout()),
});

export default connect(mapState, mapDispatch)(SideNav);

SideNav.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

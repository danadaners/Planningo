import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store";
import PropTypes from "prop-types";
import { fetchGroupsThunk } from "../../store/allGroups";
import "./sidenav.css";

class SideNav extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if(this.props.isLoggedIn){
    this.props.fetchGroups(this.props.user.id);
    }
  }

  async handleDelete(id) {
      await this.props.deleteGroup(id);
      this.props.fetchGroups();
  }

  render() {
    let { groups, user, handleClick, toggleSideNav  } = this.props;
    return (
      <div className="side-nav-wrapper">
        <div id="nav-user-wrap">
          <div id="user-nav">
            <Link to="/account" onClick={toggleSideNav}>
              <img src={user.avatarUrl} id="user-icon" style={{backgroundColor: user.color}} width={80} height={80}></img>
            </Link>
            {user.firstName}{" "}{user.lastName}
          </div>

          <h4 className="nav-tool-title">My Groups</h4>
          {!groups.length ? (
            <Link to={'/groups/create'} id="linktogroup" onClick={toggleSideNav}>You are not a part of any groups. <span>Create or Join one?</span></Link>
          ) : (
            <div id="nav-group">
              {groups.map((group) => (
                <div
                  key={group.id}
                  id="each-nav-group"
                  style={{ backgroundColor: group.color }}
                >
                  <Link to={`/groups/${group.id}`} onClick={toggleSideNav}>
                    <img src={group.imageUrl} className="nav-group-icon"></img>
                    <div id="nav-group-name">{group.name}</div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="nav-user-links-wrap">
          <div className="nav-user-links a">
            <Link to="/groups" onClick={toggleSideNav}>
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
  groups: state.groups,
  user: state.user,
  isLoggedIn: !!state.user.id,
});

const mapDispatch = (dispatch) => ({
  fetchGroups: (userId) => dispatch(fetchGroupsThunk(userId)),
  handleClick: () => dispatch(logout()),
});

export default connect(mapState, mapDispatch)(SideNav);

SideNav.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

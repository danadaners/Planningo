import React from "react";
import { connect } from "react-redux";
import { updateGroupThunk } from "../../store/singleGroup";
import { Link } from "react-router-dom";
import { FaTrashAlt} from 'react-icons/fa';
import { fetchGroupsThunk, removeGroupThunk } from "../../store/allGroups";
import "./grouplist.css";

class GroupList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchGroups(this.props.match.params.userId);
  }

  async handleDelete(id) {
    await this.props.deleteGroup(id);
    this.props.fetchGroups();
  }

  render() {
    let { groups } = this.props;
    return (
      <div className="group-wrapper">
        <h1 className="tool-title">My Groups</h1>

        {!groups.length ? (
          "You are not a part of any groups."
        ) : (
          <div id="group-box">
            {groups.map((group) => (
              <div key={group.id} className="singlegroup">
                <Link to={`/groups/${group.id}`}>
                  <div
                    id="grp-img-wrap"
                    style={{ backgroundColor: group.color }}
                  >
                    <img className="group-image" src={group.imageUrl}></img>
                  </div>
                </Link>
                <button
                  onClick={() => this.handleDelete(group.id)}
                  className="deletegroup"
                >
                  <FaTrashAlt/>
                </button>
                <div
                  id="single-grp-info"
                  style={{ backgroundColor: group.color }}
                >
                  <Link to={`/groups/${group.id}`}>
                    <h2>{group.name}</h2>
                    <div>{group.description}</div>
                    {group.users && group.User_Group.role === "admin" ? (
                      <div><Link to={`/groups/${group.id}`} id="link-group-edit">Edit Group</Link></div>
                    ) : (
                      null
                    )}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
                <Link to="/groups/create">
          <div className="create-group-btn">Create a Group </div>
        </Link>

      </div>
    );
  }
}

const mapState = (state) => ({
  groups: state.groups,
  userId: state.user.id,
});

const mapDispatch = (dispatch) => ({
  fetchGroups: (userId) => dispatch(fetchGroupsThunk(userId)),
  deleteGroup: (groupId) => dispatch(removeGroupThunk(groupId)),
  updateGroup: (group) => dispatch(updateGroupThunk(group)),
});

export default connect(mapState, mapDispatch)(GroupList);

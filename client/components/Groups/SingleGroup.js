import React from "react";
import { connect } from "react-redux";
import { updateGroupThunk, fetchSingleGroup } from "../../store/singleGroup";
import { Link } from "react-router-dom";
import { addToGroupThunk, deleteFromGroupThunk } from "../../store/singleGroup";
import "./singlegroup.css";

class SingleGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //   this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount() {
    this.props.fetchGroup(this.props.match.params.groupId);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    await this.props.addUser(this.props.group.id, this.state.email);
    this.props.fetchGroup(this.props.match.params.groupId);
  }

  async deleteUser(userId) {
    await this.props.deleteUser(this.props.group.id, userId);
    await this.props.fetchGroup(this.props.match.params.groupId);
  }

  render() {
    const group = this.props.group;

    return (
      <div key={group.id} id="group-info">
        <div id="single-grp-header" style={{ backgroundColor: group.color }}>
          <img src={group.imageUrl} id="grp-icon"></img>
          <h1 id="single-grp-name">{group.name}</h1>
          <h3 id="single-grp-desc">{group.description}</h3>
        </div>
        <div className="single-grp-body">
          <div className="single-group-body-main">
            <div id="single-grp-links">
              <Link to={`/groups/${this.props.group.id}/tasks`}>
                <button id="grp-link-button">Group Tasks</button>
              </Link>

              <Link to={`/groups/${this.props.group.id}/shoppinglist`}>
                <button id="grp-link-button">Shopping</button>
              </Link>

              <Link to={`/groups/${this.props.group.id}/rewards`}>
                <button id="grp-link-button">Rewards</button>
              </Link>
            </div>
          </div>

          <div className="single-grp-sidebar">
            {group.users ? (
              <div className="single-grp-user-wrap">
                <h3>Group Members</h3>

                {group.users.map((user) => (
                  <div key={user.id}>
                    <img
                      src={user.avatarUrl}
                      className="user-avatar"
                      style={{ backgroundColor: user.User_Group.color }}
                    />
                    {/* <button onClick={() => this.deleteUser(user.id)}>X</button> */}
                    {(() => {
                      if (user.User_Group.role === "admin") {
                        return (
                          <div>
                            {user.firstName} {user.lastName} 🌟
                          </div>
                        );
                      } else {
                        return (
                          <div>
                            {user.firstName} {user.lastName}
                          </div>
                        );
                      }
                    })()}
                  </div>
                ))}
              </div>
            ) : (
              "This group has no members."
            )}
            <form id="add-grp-form" onSubmit={this.handleSubmit}>
              <label htmlFor="email"></label>
              <input
                name="email"
                type="text"
                placeholder="Add a user by email"
                onChange={this.handleChange}
                value={this.props.email}
              />
              <button type="submit">Add</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  group: state.singleGroup,
});

const mapDispatch = (dispatch) => ({
  deleteUser: (groupId, userId) =>
    dispatch(deleteFromGroupThunk(groupId, userId)),
  fetchGroup: (group) => dispatch(fetchSingleGroup(group)),
  updateGroup: (group) => dispatch(updateGroupThunk(group)),
  addUser: (groupId, userId) => dispatch(addToGroupThunk(groupId, userId)),
});

export default connect(mapState, mapDispatch)(SingleGroup);

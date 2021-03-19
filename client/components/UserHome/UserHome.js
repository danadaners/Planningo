import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./UserHome.css";
import { fetchUserTasksThunk } from "../../store/tasks";
import { fetchSingleGroup } from "../../store/singleGroup";
import { UserPoints } from "../DataVis/UserPoints";
import {HomeTasks} from "./HomeTasks"


class UserHome extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchUserTasks();
    this.props.fetchGroup(this.props.user.groupId);
  }

  render() {
    const { user, tasks, users } = this.props;

      return (
        <div className="userhome-wrapper">

          <UserPoints users={users} user={user} />


          <div className="home-tasks">
            <HomeTasks tasks={tasks}/>
            <Link to="/tasks">Go to my tasks</Link>
          </div>
        </div>
      );
    }
  }

const mapState = (state) => {
  return {
    user: state.user,
    tasks: state.tasks,
    users: state.singleGroup.users,
  };
};

const mapDispatch = (dispatch) => ({
  fetchUserTasks: () => dispatch(fetchUserTasksThunk()),
  fetchGroup: (groupId) => dispatch(fetchSingleGroup(groupId)),
});
export default connect(mapState, mapDispatch)(UserHome);


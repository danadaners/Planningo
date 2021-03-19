import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import "./UserHome.css";
import { fetchUserTasksThunk } from "../../store/tasks";
import { fetchSingleGroup } from "../../store/singleGroup";
import format from "date-fns/format";
import { UserPoints } from "../DataVis/UserPoints";

/*
* Show today's tasks
* Show upcoming tasks
* Show overdue tasks
* Show newly UPDATED tasks
* show NEW tasks
* show USER'S TASKS
*/

class UserHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchUserTasks();
    this.props.fetchGroup(this.props.user.groupId);
  }

  render() {
    const { user, firstName, tasks, users } = this.props;
    const today = format(new Date(), "yyyy-MM-dd");

      return (
        <div className="userhome-wrapper">
          <h3>{`Hello, ${firstName}`}</h3>
          <UserPoints users={users} user={user} />
          <h3>Today</h3>

          {tasks && tasks.length ? (
            <ul>
              {tasks
                .filter((task) => {
                  return task.start === today;
                })
                .filter((task) => {
                  return task.isCompleted === false;
                })
                .filter((task) => {
                  return task.isShopping === false;
                })
                .map((task) => {
                  return <li key={task.id}>{task.name}</li>;
                })}
            </ul>
          ) : null}
          <div className="tasks-link">
            <Link to="/tasks">Go to my tasks</Link>
          </div>
        </div>
      );
    }
  }

const mapState = (state) => {
  return {
    user: state.user,
    firstName: state.user.firstName,
    tasks: state.tasks,
    users: state.singleGroup.users,
  };
};

const mapDispatch = (dispatch) => ({
  fetchUserTasks: () => dispatch(fetchUserTasksThunk()),
  fetchGroup: (groupId) => dispatch(fetchSingleGroup(groupId)),
});
export default connect(mapState, mapDispatch)(UserHome);

UserHome.propTypes = {
  firstName: PropTypes.string,
};

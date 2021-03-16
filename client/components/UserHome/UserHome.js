import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./UserHome.css";
import { fetchUserTasksThunk } from "../../store/tasks";
import { fetchGroupsThunk } from "../../store/allGroups";
import format from 'date-fns/format'


/*
* TODO: show basic data vis
* Show today's tasks
* Show upcoming tasks
* Show overdue tasks
* Show newly UPDATED tasks
* show NEW tasks
* show USER'S TASKS

*DONT SHOW SHOPPING LIST? OR AT LEAST SEPARATE TODOS AND SHOPPING

*/

class UserHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchUserTasks();
    this.props.fetchGroups(this.props.userId);
  }

  render() {
    const { firstName, tasks } = this.props;
    const today = format(new Date(),"yyyy-MM-dd")

    return (
      <div className="userhome-wrapper">
        <h3>{`Hello, ${firstName}`}</h3>

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
              .map((task) => {
                return <li key={task.id}>{task.name}</li>;
              })}
          </ul>
        ) : (
          null
        )}
        <div className="tasks-link">
          <Link to="/tasks">Go to my tasks</Link>
        </div>

      </div>
    );
  }
}
const mapState = (state) => {
  return {
    groups: state.groups,
    user: state.user,
    firstName: state.user.firstName,
    tasks: state.tasks,
  };
};

const mapDispatch = (dispatch) => ({
  fetchUserTasks: () => dispatch(fetchUserTasksThunk()),
  fetchGroups: (userId) => dispatch(fetchGroupsThunk(userId))
});
export default connect(mapState, mapDispatch)(UserHome);

UserHome.propTypes = {
  firstName: PropTypes.string,
};

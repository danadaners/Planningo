import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./UserHome.css";
import { fetchUserTasksThunk } from "../../store/tasks";
import { format } from "date-fns";
import '@pwabuilder/pwainstall'

class UserHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchUserTasks();
  }

  render() {
    const { firstName } = this.props;
    const { tasks } = this.props;
    const month = format(new Date(), "M");
    const date = format(new Date(), "d");
    const year = format(new Date(), "y");
    const today = `${year}-${month}-${date}`;

    return (
      <div className="userhome-wrapper">
        <pwa-install></pwa-install>
        <h3>{`Hello, ${firstName}`}</h3>

        <h3>Your tasks for today:</h3>

        {tasks && tasks.length > 0 ? (
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
          "You have no tasks for today."
        )}
        <Link to="/tasks">Go to my tasks</Link>
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    firstName: state.user.firstName,
    tasks: state.tasks,
  };
};
const mapDispatch = (dispatch) => ({
  fetchUserTasks: () => dispatch(fetchUserTasksThunk()),
});
export default connect(mapState, mapDispatch)(UserHome);

UserHome.propTypes = {
  firstName: PropTypes.string,
};

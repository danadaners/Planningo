import React from "react";
import "./calendar.css";
import { connect } from "react-redux";
import { fetchSingleGroup } from "../../store/singleGroup";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { fetchTasksThunk, removeTaskThunk } from "../../store/tasks";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

class AppCalendar extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchTasks();
    this.props.fetchGroup(this.props.groupId);
  }

  render() {

    const tasks =
      this.props.userTasks &&
      this.props.userTasks.tasks &&
      this.props.userTasks.tasks.map((task) => {
        return {
          ...task,
          start: `${task.start}T07:00:00.000Z`,
          end: `${task.end}T10:00:00.000Z`,
        };
      });

      let formats = {
        weekdayFormat: (date, culture, localizer) => localizer.format(date, 'EEEEE', culture),
        dateFormat: (date, culture, localizer) =>
          localizer.format(date, 'dd', culture),
      }

      return (
      <div className="calendar-wrap">
        <div className="big-calendar">
          <Calendar
            events={tasks && tasks.length > 0 ? tasks : []}
            titleAccessor="name"
            startAccessor="start"
            endAccessor="end"
            defaultDate={new Date()}
            localizer={localizer}
            formats={formats}
          />
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  groupId: state.user.groupId,
  userTasks: state.tasks,
  userId: state.user.id,
});

const mapDispatch = (dispatch) => ({
  fetchTasks: () => dispatch(fetchTasksThunk()),
  deleteTask: (taskId) => dispatch(removeTaskThunk(taskId)),
  fetchGroup: (groupId) => dispatch(fetchSingleGroup(groupId)),
});

export default connect(mapState, mapDispatch)(AppCalendar);

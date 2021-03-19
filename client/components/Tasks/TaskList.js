import React from "react";
import { connect } from "react-redux";
import GroupTaskModal from "./GroupTaskModal";
import { fetchSingleGroup } from "../../store/singleGroup";
import UpdateTaskModal from "./UpdateTaskModal";
import { removeTaskThunk } from "../../store/tasks";
import { updateTaskCompletion } from "../../store/singletask";
import { fetchSingleGroupTasks } from "../../store/singleGroup";
import {
  postCompletedPointsThunk,
  removeCompletedPointsThunk,
} from "../../store/point";
import {
  FaPlusSquare,
  FaSort,
  FaTrashAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { format } from "date-fns";
import "./grouptasks.css";
import "./Tasks.css";

//TODO: filters - show/hide completed tasks, sort by users (should already be sorted by date)
//TODO: show "overdue" in red
//TODO: single task view
//TODO: modals for deleting task and comppleting
//TODO: user permissions for tasks? like completing and deleting
//TODO: add CREATED BY (userId) in tasks.

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.showModal = this.showModal.bind(this);
    this.showTaskModal = this.showTaskModal.bind(this);
  }

  componentDidMount() {
    this.props.fetchGroupTasks(this.props.groupId);
    this.props.fetchGroup(this.props.groupId);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleDelete(id) {
    await this.props.deleteTask(id);
    this.props.fetchGroupTasks(this.props.groupId);
  }

  async toggleCompleted(taskId, isCompleted) {
    try {
      if (isCompleted === false) {
        await this.props.updateTaskCompletion(taskId, !isCompleted);
        await this.props.postAwardedPoints(taskId);
      } else {
        await this.props.updateTaskCompletion(taskId, !isCompleted);
        await this.props.removePoints(taskId);
      }
      this.props.fetchGroupTasks(this.props.groupId);
    } catch (err) {
      console.error(err);
    }
  }

  showModal(e) {
    this.setState({ show: !this.state.show });
  }

  showTaskModal(e, taskId) {
    this.setState({ taskId, showTask: !this.state.showTask });
  }

  render() {
    let tasks = this.props.group.tasks;
    let group = this.props.group;
    let categories = this.props.group.categories;

    return (
      <div className="task-wrapper">
        {this.state.show || this.state.showTask ? (
          <div id="darken-page"></div>
        ) : null}
        <div id="task-box">
          <div className="task-box-header">
            Tasks for
            <div id="grpname" style={{ color: group.color }}>
              {group.name}
            </div>
          </div>
          <div className="task-box-body">
            <div id="task-box-categories">
              <div id="category-title">Categories</div>

              {categories
                ? categories.map((category) => (
                    <div key={category.id} className="each-category-wrap">
                      <div
                        id="category-icon-wrap"
                        style={{ backgroundColor: category.color }}
                      >
                        <img
                          src={category.imageUrl}
                          className="category-icon"
                        ></img>
                      </div>
                      {category.name}
                    </div>
                  ))
                : null}
            </div>
            {/* LIST OF TASKS */}
            <div id="task-box-list">
              {tasks && tasks.length
                ? tasks
                    .filter((task) => task.isShopping === false)
                    .map((task) => (
                      <div key={task.id} className="singletask">
                        <div
                          id="catcolor"
                          style={{
                            backgroundColor: task.category
                              ? task.category.color
                              : "#E8E8E8",
                          }}
                        ></div>

                        <button
                          onClick={() =>
                            this.toggleCompleted(task.id, task.isCompleted)
                          }
                          className="completeTask"
                        >
                          <div
                            className={
                              task.isCompleted
                                ? "check-circle complete"
                                : "check-circle incomplete"
                            }
                          >
                            <FaCheckCircle />
                          </div>
                        </button>

                        <a
                          onClick={(e) => this.showTaskModal(e, task.id)}
                          id="task-name-click"
                        >
                          <div id="name-date-wrap">
                            {task.name}
                            <p id="date-created">
                              {format(
                                new Date(`${task.end}T12:00:00.000Z`),
                                "MMM d"
                              )}
                            </p>
                          </div>

                          {task.points > 0 ? (
                            <div id="numberpoints">
                              {task.points}
                              <img
                                src="/assets/coin.png"
                                className="coin"
                              ></img>
                            </div>
                          ) : null}
                        </a>

                        <UpdateTaskModal
                          selectedTask={task.id === this.state.taskId}
                          task={task}
                          onClose={(e) => this.showTaskModal(e)}
                          showTask={this.state.showTask}
                          groupId={this.props.match.params.groupId}
                        />

                        <button
                          onClick={() => this.handleDelete(task.id)}
                          className="deleteTask"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    ))
                : null}
            </div>
            <div id="just-another-layout-div"></div>
          </div>
          <div id="add-button-div">
            <button
              onClick={(e) => {
                this.showModal(e);
              }}
              className="add-task-button"
            >
              <div id="ahhh">
                <FaPlusSquare />
              </div>
              New Task
            </button>
            <GroupTaskModal
              groupId={this.props.groupId}
              onClose={(e) => this.showModal(e)}
              show={this.state.show}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  userId: state.user.id,
  group: state.singleGroup,
  groupId: state.user.groupId,
});

const mapDispatch = (dispatch) => ({
  fetchGroupTasks: (groupId) => dispatch(fetchSingleGroupTasks(groupId)),
  fetchGroup: (groupId) => dispatch(fetchSingleGroup(groupId)),
  deleteTask: (taskId) => dispatch(removeTaskThunk(taskId)),
  updateTaskCompletion: (taskId, isCompleted) =>
    dispatch(updateTaskCompletion(taskId, isCompleted)),
  postAwardedPoints: (taskId) => dispatch(postCompletedPointsThunk(taskId)),
  removePoints: (taskId) => dispatch(removeCompletedPointsThunk(taskId)),
});

export default connect(mapState, mapDispatch)(TaskList);

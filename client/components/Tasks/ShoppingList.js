import React from "react";
import { connect } from "react-redux";
import { updateTaskCompletion } from "../../store/singletask";
import "./Tasks.css";
import CreateTaskModal from "./CreateTaskModal";
import UpdateTaskModal from "./UpdateTaskModal";
import { fetchShoppingItemsThunk, removeTaskThunk } from "../../store/tasks";
import {   FaPlusSquare, FaCheckCircle, FaTrashAlt } from 'react-icons/fa'
import { format } from "date-fns";

class ShoppingList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
    this.showModal = this.showModal.bind(this);
    this.showTaskModal = this.showTaskModal.bind(this);
  }
  componentDidMount() {
    this.props.fetchItems();
  }

  async handleDelete(id) {
    await this.props.deleteItem(id);
    this.props.fetchItems();
  }

  async toggleCompleted(taskId, isCompleted) {
    await this.props.updateTaskCompletion(taskId, !isCompleted);

    this.props.fetchItems();
  }

  showModal(e) {
    this.setState({ show: !this.state.show });
  }

  showTaskModal(e, taskId) {
    this.setState({ taskId, showTask: !this.state.showTask });
  }

  render() {
    let { tasks } = this.props.tasks;

    return (
      <div className="task-wrapper">
        {this.state.show === true || this.state.showTask === true ? (
          <div id="darken-page"></div>
        ) : null}
        <div id="task-box">
          <div className="task-box-header">Shopping List</div>
          <div className="task-box-body">
            <div id="task-box-categories">Categories</div>

            {/* LIST OF TASKS */}
            <div id="task-box-list">
              {tasks && tasks.length
                ? tasks.map((task) => (
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
                          <FaCheckCircle/>
                        </div>
                      </button>

                      <a
                        onClick={(e) => this.showTaskModal(e, task.id)}
                        id="task-name-click"
                      >
                        <div id="name-date-wrap">
                          {task.name}
                          {/* <p id="date-created">
                            added {format(new Date(task.createdAt), "MMM d")}
                          </p> */}
                          <p id="date-created">
                            {format(
                              new Date(`${task.start}T12:00:00.000Z`),
                              "MMM d"
                            )}
                          </p>
                        </div>

                        {task.category ? (
                          <div id="singletask-category">
                            <div
                              id="singletask-cat-wrap"
                              style={{ backgroundColor: task.category.color }}
                            >
                              <img
                                src={task.category.imageUrl}
                                id="task-cat-icon"
                              ></img>
                            </div>
                          </div>
                        ) : null}
                      </a>

                      <UpdateTaskModal
                        selectedTask={task.id === this.state.taskId}
                        task={task}
                        onClose={(e) => this.showTaskModal(e)}
                        showTask={this.state.showTask}
                      />
                      <button
                        onClick={() => this.handleDelete(task.id)}
                        className="deleteTask"
                      >
                        <FaTrashAlt/>
                      </button>
                    </div>
                  ))
                : "You have no tasks"}
            </div>
            <div id="just-another-layout-div">
              <div>Filters</div>
            </div>
          </div>
          <div id="add-button-div">
            <button
              onClick={(e) => {
                this.showModal(e);
              }}
              className="add-task-button"
            >
              <div id="ahhh">
                <FaPlusSquare/>
              </div>
              Add New Task
            </button>
            <CreateTaskModal
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
  tasks: state.tasks,
  userId: state.user.id,
});

const mapDispatch = (dispatch) => ({
  fetchItems: () => dispatch(fetchShoppingItemsThunk()),
  deleteItem: (taskId) => dispatch(removeTaskThunk(taskId)),
  updateTaskCompletion: (taskId, isCompleted) =>
    dispatch(updateTaskCompletion(taskId, isCompleted)),
});

export default connect(mapState, mapDispatch)(ShoppingList);

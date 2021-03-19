import React, { Component } from "react";
import { connect } from "react-redux";
import { updateTaskThunk } from "../../store/tasks";
import { fetchTasksThunk } from "../../store/tasks";
import { fetchGroupsThunk } from "../../store/allGroups";
import "./taskmodal.css";
import { FaTimes } from 'react-icons/fa'

class UpdateGroceryModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.task.name,
      groupId: this.props.task.groupId,
      description: this.props.task.description || "",
      categoryId: this.props.task.categoryId,
      taskId: this.props.task.id,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }
  handleDateChange(newValue) {
    this.setState({
      selectedDate: newValue,
    });
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (this.state.name == "") {
      this.setState({
        error: "Name can't be empty!",
      });
      return false;
    } else if (this.state.groupId == "") {
      this.setState({
        error: "Please select a group!",
      });
      return false;
    }
    await this.props.updateTask(this.state);
    this.props.onClose();
  }

  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };

  render() {
    const group = this.props.groups.find((x) => x.id === this.state.groupId);
    const categories = group && group.categories;

    if (!this.props.showTask || !this.props.selectedTask) {
      return null;
    }
    return (
      <div>
        <div className="task-modal-content edit">
          <div id="top-taskmodal-div">
            <div id="modal-title">{this.props.task.name}</div>
            <button
              onClick={(e) => this.onClose(e)}
              className="close-modal-btn"
            >
              <FaTimes/>
            </button>
          </div>

          <div id="lower-taskmodal-div">
            <form id="add-task-form" onSubmit={this.handleSubmit}>
              <label htmlFor="name">
                {this.props.task.isShopping === false ? "Task:" : "Item:"}
              </label>
              <input
                name="name"
                type="text"
                className="edit-modal-input name"
                onChange={this.handleChange}
                value={this.state.name}
              />

              <label htmlFor="description">Description:</label>
              <textarea
                name="description"
                type="text"
                rows="4"
                className="edit-modal-input desc"
                onChange={this.handleChange}
                value={this.state.description || ""}
              />

              <div id="group-category-wrap">
                <div id="modal-category-wrap">
                  <label htmlFor="categoryId">Category:</label>
                  <select
                    onChange={(e) =>
                      this.setState({ categoryId: e.target.value || null })
                    }
                    value={this.state.categoryId || ""}
                    name="categoryId"
                    className="edit-choose-category"
                  >
                    <option value="">None</option>
                    {this.props.task.isShopping === false
                      ? categories
                        ? categories
                            .filter((category) => {
                              return category.isShopping === false;
                            })
                            .map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))
                        : null
                      : categories
                      ? categories
                          .filter((category) => {
                            return category.isShopping === true;
                          })
                          .map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))
                      : null}
                  </select>
                </div>
              </div>
              {<div> {this.state.error} </div>}
              <button type="submit" id="modal-submit-button">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  tasks: state.tasks,
  groups: state.groups,
});

const mapDispatch = (dispatch) => ({
  fetchTasks: (userId) => dispatch(fetchTasksThunk(userId)),
  updateTask: (task) => dispatch(updateTaskThunk(task)),
  fetchGroups: () => dispatch(fetchGroupsThunk()),
});

export default connect(mapState, mapDispatch)(UpdateGroceryModal);

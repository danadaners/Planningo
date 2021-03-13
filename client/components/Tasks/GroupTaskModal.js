import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleGroup, addGroupTaskThunk } from "../../store/singleGroup";
import { addGroupShoppingItemThunk } from "../../store/tasks";
import "./taskmodal.css";
import { FaTimes } from 'react-icons/fa';
import KeyboardDatePickerTab from "../Calendar/DatePicker";

class GroupTaskModal extends Component {
  constructor(props) {
    super(props);
    let path = window.location.pathname;
    let part = path.split("/").pop();
    this.state = {
      name: "",
      description: "",
      points: 0,
      groupId: this.props.groupId,
      error: null,
      categoryId: null,
      userId: null,
      selectedDate: new Date(),
      modaltype: part,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchGroup(this.props.groupId);
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
    try {
      {
        this.state.modaltype === "tasks"
          ? await this.props.addGroupTask(this.props.groupId, this.state)
          : await this.props.addGroupShoppingItem(
              this.state,
              this.props.groupId
            );
      }
      this.setState({
        name: "",
        userId: null,
        description: "",
        points: 0,
        categoryId: null,
        selectedDate: new Date(),
      });
      await this.props.fetchGroup(this.props.groupId);
      this.props.onClose();
    } catch (err) {
      console.log("error creating task", err);
    }
  }

  async handleDelete(id) {
      await this.props.deleteTask(id);
  }

  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };

  render() {
    let group = this.props.group;
    let categories = this.props.group.categories;

    if (!this.props.show) {
      return null;
    }
    return (
      <div>
        <div>{this.props.children}</div>
        <div className="task-modal-content">
          <div id="top-taskmodal-div">
            <div id="modal-title">
              NEW {this.state.modaltype === "tasks" ? "TASK" : "ITEM"}
            </div>
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
                {this.state.modaltype === "tasks" ? "TASK:" : "ITEM:"}
              </label>
              <input
                name="name"
                type="text"
                className="modal-input name"
                onChange={this.handleChange}
                value={this.state.name}
              />

              <label htmlFor="description">Description:</label>
              <textarea
                name="description"
                type="text"
                rows="4"
                className="modal-input desc"
                onChange={this.handleChange}
                value={this.state.description}
              />

              {this.state.modaltype === "tasks" ? (
                <div>
                  <label htmlFor="points">Points:</label>
                  <input
                    name="points"
                    type="text"
                    className="modal-input points"
                    onChange={this.handleChange}
                    value={this.state.points}
                  />
                  <img src="/assets/coin.png" className="coin"></img>
                </div>
              ) : null}

              <div id="modal-category-user-wrap">
                <label htmlFor="categoryId">Category:</label>

                <select
                  onChange={(e) =>
                    this.setState({ categoryId: e.target.value || null })
                  }
                  value={this.state.categoryId || ""}
                  name="categoryId"
                  className="choose-category"
                >
                  <option value="">None</option>
                  {categories && categories.length > 0
                    ? categories
                        .filter((category) => {
                          if (this.state.modaltype === "tasks") {
                            return category.isShopping === false;
                          } else {
                            return category.isShopping === true;
                          }
                        })
                        .map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))
                    : null}
                </select>

                <label htmlFor="userId"></label>
                <select
                  onChange={(e) =>
                    this.setState({ userId: e.target.value || null })
                  }
                  value={this.state.userId || ""}
                  name="userId"
                  className="choose-category"
                >
                  <option value="" disabled>
                    Select User
                  </option>
                  {group && group.users
                    ? group.users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.firstName} {user.lastName}
                        </option>
                      ))
                    : "There are no users"}
                </select>
              </div>
              {<div> {this.state.error} </div>}
              <div id="choose-date-grp">
                Due By:
                <KeyboardDatePickerTab
                  selectedDate={this.state.selectedDate}
                  handleDateChange={this.handleDateChange}
                />
              </div>
              <button id="modal-submit-button-grp" type="submit">
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  userId: state.user.id,
  group: state.singleGroup,
});

const mapDispatch = (dispatch) => ({
  fetchGroup: (groupId) => dispatch(fetchSingleGroup(groupId)),
  addGroupTask: (groupId, task) => dispatch(addGroupTaskThunk(groupId, task)),
  updateTask: (task) => dispatch(updateSingleTask(task)),
  addGroupShoppingItem: (task, groupId) =>
    dispatch(addGroupShoppingItemThunk(task, groupId)),
});

export default connect(mapState, mapDispatch)(GroupTaskModal);

import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { addGroupThunk } from "../../store/allGroups";
import "./creategroup.css";
import MiscIcons from "../Images/MiscIcons";
//TODO: Optimize images in this

class CreateGroup extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      description: "",
      color: "#FFBF00",
      redirectTo: null,
      error: "",
      imageUrl: "/assets/icons/misc/001-sofa.png",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeImage = this.changeImage.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  changeImage(image) {
    this.setState({
      imageUrl: image,
    });
  }

  //clears boxes after submit
  async handleSubmit(event) {
    event.preventDefault();

    await this.props.addGroup(this.state);
    if (this.state.name === "") {
      this.setState({
        error: "Please enter a group name!",
      });
      return false;
    } else {
      alert(
        `Your group "${this.state.name}" was created! Redirecting you to your groups page..`
      );
      this.setState({
        redirectTo: "/groups",
        name: "",
        description: "",
        color: "",
        imageUrl: "",
      });
    }
  }

  render() {
    const colors = [
      "#FFBF00",
      "#FF7F50",
      "#DE3163",
      "#9FE2BF",
      "#40E0D0",
      "#6495ED",
      "#CCCCFF",
    ];

    const singleColors = colors.map((color) => {
      return (
        <div
          key={color}
          style={{ backgroundColor: color }}
          className="pick-color"
          onClick={() => {
            this.setState({ color: color });
          }}
          value={color}
        ></div>
      );
    });

    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div className="create-group-wrapper">
          <form id="add-group-form-create-group" onSubmit={this.handleSubmit}>
            <h3 id="create-group-header">New Group</h3>
            <label htmlFor="name">Name:</label>
            <input
              name="name"
              type="text"
              className="create-group-input"
              onChange={this.handleChange}
              value={this.state.name}
            />
            <label htmlFor="name">Description:</label>
            <textarea
              name="description"
              type="text"
              rows="3"
              className="create-group-input"
              onChange={this.handleChange}
              value={this.state.description}
            />
            <label htmlFor="imageUrl">Select an Icon:</label>
            <input
              name="imageUrl"
              type="text"
              className="create-group-input color"
              value={this.state.imageUrl}
              onChange={this.handleChange}
            />
            <div id="wrap-icons">
              <MiscIcons changeImage={this.changeImage} />
            </div>
            <label htmlFor="color">Group Color:</label>
            <div id="color-picker">{singleColors}</div>
            <input
              name="color"
              className="create-group-input color"
              value={this.state.color}
              readOnly={true}
            />
            Current Icon:
            <div
              className="current-icon"
              style={{ backgroundColor: this.state.color }}
            >
              <img
                src={this.state.imageUrl}
                className="current-icon-image"
              ></img>
            </div>
            <h3 id="errormsg">{this.state.error}</h3>
            <button className="create-group-form-button" type="submit">
              Add Group
            </button>
          </form>
        </div>
      );
    }
  }
}

const mapDispatch = (dispatch) => ({
  addGroup: (group) => dispatch(addGroupThunk(group)),
});

export default connect(null, mapDispatch)(CreateGroup);

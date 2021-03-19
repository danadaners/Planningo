import React from "react";
import { connect } from "react-redux";
import { addGroupThunk } from "../../store/allGroups";
import "./creategroup.css";
import MiscIcons from "../Images/MiscIcons";

class CreateGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      color: "#FFBF00",
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

  async handleSubmit(event) {
    try {
      event.preventDefault();

      await this.props.addGroup(this.state);
      if (this.state.name === "") {
        this.setState({
          error: "Please enter a group name!",
        });
        return false;
      } else {
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
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
            <img src={this.state.imageUrl} className="current-icon-image"></img>
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

const mapState = (state) => {
  return {
    hasGroup: !!state.user.groupId,
  };
};

const mapDispatch = (dispatch) => ({
  addGroup: (group) => dispatch(addGroupThunk(group)),
});

export default connect(mapState, mapDispatch)(CreateGroup);

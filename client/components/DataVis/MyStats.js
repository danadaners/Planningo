import React from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import { connect } from "react-redux";
import { fetchSingleGroup } from "../../store/singleGroup";
import { fetchUserPointsThunk } from "../../store/point";

//write a formula for data
//write a formula for custom tasks
class MyStats extends React.Component {
  componentDidMount() {
    this.props.fetchUserPoints(this.props.user.id);
    // this.props.fetchSingleGroup(this.props.match.params.groupId);
  }
  convertData(points) {
    points;
  }

  render() {
    const newData = this.props.points;

    return (
      <div>
        {newData.length > 0 ? (
          <div>
            <h1>My Stats</h1>
            <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
              <VictoryAxis
                tickValues={[
                  "Home",
                  "Work",
                  "Finance",
                  "School",
                  "Family",
                  "Grocery",
                ]}
              />
              <VictoryAxis dependentAxis tickFormat={(x) => `${x / 1}`} />
              <VictoryBar
                data={newData}
                x={"categoryId"}
                y={"value"}
                style={{ data: { fill: "#ACB9E1" } }}
              />
            </VictoryChart>
          </div>
        ) : (
          <h3>No Info to Display Yet</h3>
        )}
      </div>
    );
  }
}

const mapState = (state) => ({
  user: state.user,
  points: state.points,
});
const mapDispatch = (dispatch) => ({
  fetchUserPoints: (userId) => dispatch(fetchUserPointsThunk(userId)),
  fetchSingleGroup: (groupId) => dispatch(fetchSingleGroup(groupId)),
});
export default connect(mapState, mapDispatch)(MyStats);

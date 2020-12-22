import React from "react";
import { connect } from "react-redux";
import { fetchSingleGroup } from "../../store/singleGroup";
import {
  fetchUserPointsThunk,
  fetchGroupPointsThunk,
  fetchUserGroupPointsThunk,
} from "../../store/point";
import "./grouprewards.css";
import { Link } from "react-router-dom";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryPie,
} from "victory";

class GroupRewards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "",
      points: "",
    };
  }
  async componentDidMount() {
    await this.props.fetchGroup(this.props.match.params.groupId);
    await this.props.fetchGroupPoints(this.props.match.params.groupId);
  }

  pointCalc(points, userId) {
    return points
      .filter((user) => user.userId === userId)
      .reduce((accum, point) => {
        return accum + point.value;
      }, 0);
  }

  render() {
    const group = this.props.group;
    const points = this.props.points;
    const groupUsers = this.props.group.users;

    let mappedUsers;

    {
      groupUsers && groupUsers.length > 0 ? (
        (mappedUsers = groupUsers.map((user) => {
          return {
            x: user.firstName,
            y: user.tasksCompleted,
            label: user.firstName,
          };
        }))
      ) : (
        <h3>Group Users not available yet</h3>
      );
    }
    return (
      <div className="group-reward-wrapper">
        <h1>Number of Points</h1>
        {points && points.length > 0 ? (
          group.users && group.users.length > 0 ? (
            <div id="group-reward-user-wrap">
              {group.users.map((user) => (
                <div key={user.id} id="group-reward-user">
                  <img src={user.avatarUrl} className="group-user-icon" />
                  {user.firstName}:{" "}
                  {points.length > 0 ? this.pointCalc(points, user.id) : 0}{" "}
                  points
                </div>
              ))}
              <div>
                <h3>Group Stats</h3>
                <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
                  <VictoryAxis
                    tickValues={this.props.points.map((user) => user.firstName)}
                  />
                  <VictoryAxis dependentAxis tickFormat={(x) => `${x / 1}`} />
                  <VictoryBar
                    data={this.props.points}
                    x={"firstName"}
                    y={"value"}
                    style={{ data: { fill: "#ff7290" } }}
                  />
                </VictoryChart>

                {groupUsers && groupUsers.length > 0 ? (
                  <div>
                    <h3>Tasks Completed</h3>
                    <VictoryPie
                      data={mappedUsers}
                      labels={mappedUsers.label}
                      colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
                    />
                  </div>
                ) : (
                  <h3>Number of Tasks not available yet</h3>
                )}
              </div>
            </div>
          ) : (
            "This group has no members."
          )
        ) : (
          <h1>0</h1>
        )}
        <div className="task-box-header"><Link to={`/groups/${group.id}`}> Go back</Link></div>
      </div>
    );
  }
}

const mapState = (state) => ({
  userId: state.user.id,
  group: state.singleGroup,
  tasks: state.tasks,
  points: state.points,
});

const mapDispatch = (dispatch) => ({
  fetchGroup: (groupId) => dispatch(fetchSingleGroup(groupId)),
  fetchUserPoints: (userId) => dispatch(fetchUserPointsThunk(userId)),
  fetchGroupPoints: (groupId) => dispatch(fetchGroupPointsThunk(groupId)),
  fetchUserGroupPoints: (userId, groupId) =>
    dispatch(fetchUserGroupPointsThunk(userId, groupId)),
});

export default connect(mapState, mapDispatch)(GroupRewards);

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./points.css";
import { fetchGroupPointsThunk } from "../../store/point"

const mapState = (state) => {
  return {
    users: state.singleGroup.users,
    groupId: state.user.groupId,
    group: state.points
  };
};

const mapDispatch = (dispatch) => ({
  fetchGroupPoints: (groupId) => dispatch(fetchGroupPointsThunk(groupId)),
});


const GroupPoints = ({fetchGroupPoints, users, groupId, group}) => {
  // const [userPanel, setUserPanel] = useState(false);

  useEffect(() => {
    fetchGroupPoints(groupId);
  }, []);

  // console.log({group})

  // // const data = group && group.length ? group.map(point => {
  // //   return {x: point.firstName, y: point.value}
  // // }).reduce((accum, points) => {
  // //   return accum += points.y
  // // }, 0) : null

  // console.log({data})

  return (
    <div className="userpoints">
      {users
        ? users.map((user) => {
            return <div key={user.id} className="user-icon">
              <img src={user.avatarUrl} width={120} height={120}
              style={{backgroundColor: user.color}}
              />
              {user.firstName}
              </div>;
          })
        : null}
    </div>
  );

}

export default connect(mapState, mapDispatch)(GroupPoints);


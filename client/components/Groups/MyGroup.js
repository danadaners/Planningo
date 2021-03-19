import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchSingleGroup } from "../../store/singleGroup";

const mapState = (state) => {
  return {
    hasGroup: !!state.user.groupId,
    users: state.singleGroup.users,
    groupId: state.user.groupId,
    group: state.singleGroup,
  };
};

const mapDispatch = (dispatch) => ({
  fetchGroup: (groupId) => dispatch(fetchSingleGroup(groupId)),
});

const MyGroup = ({ hasGroup, users, fetchGroup, groupId, group }) => {
  const [userPanel, setUserPanel] = useState(false);

  useEffect(() => {
    fetchGroup(groupId);
  }, []);

  const toggleUserPanel = () => {
    setUserPanel(!userPanel);
  };

  return (
    <div className="group-wrapper">
      {!hasGroup ? (
        <div id="no-group">
          You're not part of a group! Join or Create a group to continue.
          <button>
            <Link to="/group/new">New Group</Link>
          </button>
        </div>
      ) : (
        <div className="settings">
          <h2>Group Settings</h2>
          {group ? group.name : null}
          <button onClick={toggleUserPanel}>Click me</button>
          {/* {userPanel ? <div> test </div> : null} */}
        </div>
      )}
    </div>
  );
};

export default connect(mapState, mapDispatch)(MyGroup);

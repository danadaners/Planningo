import React, {useState} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const MyGroup = ({ hasGroup }) => {

  const [addUsers, setaddUsers] = useState(false);

  return (
    <div>
      {!hasGroup ? (
        <div id="no-group">
          It looks like you're not part of a group! Join or Create a group to
          continue.
          <button>
            <Link to="/group/new">New Group</Link>
          </button>
        </div>
      ) : (
        <div>Yes</div>
      )}
    </div>
  );
};

const mapState = (state) => {
  return {
    hasGroup: !!state.user.groupId,
  };
};

export default connect(mapState, null)(MyGroup);

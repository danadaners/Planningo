import React from "react";
import "./points.css";

const UserPoints = ({ user }) => {
  return (
    <div className="userpoints">
      {user ? (
        <div className="user">
          <img
            src={user.avatarUrl}
            width={120}
            height={120}
            style={{ backgroundColor: user.color }}
            className="user-icon"
          />
          {user.firstName}
        </div>
      ) : null}
    </div>
  );
};

export default UserPoints;

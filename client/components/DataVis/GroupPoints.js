import React from "react"
import "./points.css";


const GroupPoints = ({users}) => {
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

export default GroupPoints;

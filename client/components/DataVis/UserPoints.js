import React, { useState } from "react";

export const UserPoints = ({ users, user }) => {
  const [selected, setSelected] = useState(user);

  // const chooseUser = () => {

  // }

  return (
    <div>
      {users
        ? users.map((user) => {
            return <div id={user.id}>
              <img src={user.avatarUrl} width={150} height={150}
              style={{backgroundColor: user.color}}
              />
              {user.firstName}
              {user.tasksCompleted} Tasks Completed
              </div>;
          })
        : null}
    </div>
  );
};

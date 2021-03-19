import React from "react";
import format from "date-fns/format";
import isBefore from "date-fns/isBefore";

/*
 * Show today's tasks
 * Show upcoming tasks
 * Show overdue tasks
 * Show newly UPDATED tasks
 * show NEW tasks
 * show USER'S TASKS
 */

export const HomeTasks = ({ tasks }) => {
  const today = format(new Date(), "yyyy-MM-dd");

  const todayTasks =
    tasks && tasks.length
      ? tasks.filter(
          (task) => task.end === today && !task.isCompleted && !task.isShopping
        )
      : null;

  const overdueTasks =
    tasks && tasks.length
      ? tasks.filter(
          (task) =>
            !task.isCompleted && !task.isShopping && isBefore(new Date(task.end), new Date()) && task.end !== today
        )
      : null;

  console.log(overdueTasks);


  return (
    <div>
      <h2>Today</h2>
      {todayTasks
        ? todayTasks.map((task) => <div key={task.id}>{task.name}</div>)
        : null}

        <h2>Overdue</h2>
        {overdueTasks
        ? overdueTasks.map((task) => <div key={task.id}>{task.name}</div>)
        : null}
    </div>
  );
};

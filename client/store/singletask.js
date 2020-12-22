import axios from "axios";

// intialState
const initialState = {};

// action constants
const GET_TASK = "GET_TASK";
const UPDATE_TASK = "UPDATE_TASK";
const UPDATE_TASK_COMPLETE = "UPDATE_TASK_COMPLETE";

const getTask = (task) => ({ type: GET_SINGLE_TASK, task });
const updateTask = (task) => ({ type: UPDATE_TASK, task });
const updateTaskComplete = (taskId, isCompleted) => ({
  type: UPDATE_TASK_COMPLETE,
  taskId,
  isCompleted,
});

// thunk creators
export const fetchTaskThunk = (taskId) => async (dispatch) => {
  try {
    const { data: users } = await axios.get(`/api/tasks`);

    const tasks = users.tasks;
    const task = tasks.filter((task) => task.id === taskId);

    dispatch(getTask(task));
  } catch (error) {
    console.log("error fetching task");
  }
};

export const updateSingleTask = (taskId) => async (dispatch) => {
  try {
    const { data: updatedTask } = await axios.put(`/api/tasks/${taskId}`);
    dispatch(updateTask(updatedTask));
  } catch (error) {
    console.error(error);
  }
};

export const updateTaskCompletion = (taskId, isCompleted) => async (
  dispatch
) => {
  try {
    await axios.patch(`/api/tasks/${taskId}`, {
      updatedFields: { isCompleted },
    });
    dispatch(updateTaskComplete(taskId, isCompleted));
  } catch (error) {
    console.error(error);
  }
};

export default function singleTaskReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TASK:
      return action.task;
    case UPDATE_TASK:
      return { ...state, ...action.task };
    case UPDATE_TASK_COMPLETE:
      return { ...state, ...action.task };
    default:
      return state;
  }
}

import axios from "axios";

/**
 * ACTION TYPES
 */
const GET_TASKS = "GET_TASKS";
const GET_USER_TASKS = "GET_USER_TASKS";
const ADD_TASK = "ADD_TASK";
const DELETE_TASK = "DELETE_TASK";
const GET_SHOPPING_ITEMS = "GET_SHOPPING_ITEMS";
const ADD_SHOPPING_ITEM = "ADD_SHOPPING_ITEM";
const ADD_GROUP_SHOPPING_ITEM = "ADD_GROUP_SHOPPING_ITEM";
const UPDATE_TASK = "UPDATE_TASK";
const UPDATE_GROUP_TASK = "UPDATE_GROUP_TASK";

/**
 * INITIAL STATE
 */

const initialState = {};

/**
 * ACTION CREATORS
 */

const getTasks = (tasks) => ({ type: GET_TASKS, tasks });
const getUserTasks = (tasks) => ({ type: GET_USER_TASKS, tasks });
const addTask = (task) => ({ type: ADD_TASK, task });
const deleteTask = (taskId) => ({ type: DELETE_TASK, taskId });
const getShoppingItems = (tasks) => ({ type: GET_SHOPPING_ITEMS, tasks });
const addShoppingItem = (task) => ({ type: ADD_SHOPPING_ITEM, task });
const addGroupShoppingItem = (task) => ({
  type: ADD_GROUP_SHOPPING_ITEM,
  task,
});
const updateTask = (task) => ({ type: UPDATE_TASK, task });
const updateGroupTask = (newTask) => ({ type: UPDATE_GROUP_TASK, newTask });

/**
 * THUNK CREATORS
 */

export const fetchUserTasksThunk = () => async (dispatch) => {
  try {
    const { data: tasks } = await axios.get(`/api/tasks/home`);
    dispatch(getUserTasks(tasks));
  } catch (error) {
    console.log("error fetching your tasks");
  }
};
export const fetchTasksThunk = () => async (dispatch) => {
  try {
    const { data: tasks } = await axios.get(`/api/tasks`);
    dispatch(getTasks(tasks));
  } catch (error) {
    console.log("error fetching tasks");
  }
};

export const addTaskThunk = (task) => async (dispatch) => {
  try {
    const { data: newTask } = await axios.post("/api/tasks", task);
    dispatch(addTask(newTask));
  } catch (error) {
    console.error("Error adding task!");
    console.error(error);
  }
};

export const removeTaskThunk = (taskId) => async (dispatch) => {
  try {
    await axios.delete(`/api/tasks/${taskId}`);
    dispatch(deleteTask(taskId));
  } catch (error) {
    console.error("Error deleting task!");
    console.error(error);
  }
};

export const fetchShoppingItemsThunk = () => async (dispatch) => {
  try {
    const { data: tasks } = await axios.get(`/api/tasks/shopping`);
    dispatch(getShoppingItems(tasks));
  } catch (error) {
    console.log("error fetching tasks");
  }
};

export const addShoppingItemThunk = (task) => async (dispatch) => {
  try {
    const { data: newTask } = await axios.post("/api/tasks/shopping", task);
    dispatch(addShoppingItem(newTask));
  } catch (error) {
    console.error("Error adding task!");
    console.error(error);
  }
};
export const addGroupShoppingItemThunk = (task, groupId) => async (
  dispatch
) => {
  try {
    const { data: newTask } = await axios.post(
      `/api/groups/${groupId}/shopping`,
      task
    );
    dispatch(addGroupShoppingItem(newTask));
  } catch (error) {
    console.error("Error adding shopping item!");
  }
};
export const updateTaskThunk = (task) => async (dispatch) => {
  try {
    const { data: updatedTask } = await axios.put(`/api/tasks/`, task);
    dispatch(updateTask(updatedTask));
  } catch (error) {
    console.error("Error updating task!");
    console.error(error);
  }
};

export const updateGroupTaskThunk = (task, groupId) => async (dispatch) => {
  try {
    const { data: updatedGroupTask } = await axios.put(
      `/api/groups/${groupId}/tasks/`,
      task
    );
    dispatch(updateGroupTask(updatedGroupTask));
  } catch (error) {
    console.error("Error updating group task!");
    console.error(error);
  }
};

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TASKS:
      return action.tasks;
    case GET_USER_TASKS:
      return action.tasks;
    case GET_SHOPPING_ITEMS:
      return action.tasks;
    case ADD_TASK:
      return { ...state, ...action.task };
    case ADD_SHOPPING_ITEM:
      return { ...state, ...action.task };
    case ADD_GROUP_SHOPPING_ITEM:
      return { ...state, ...action.task };
    case DELETE_TASK:
      return { ...state };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.task.id) return action.task;
          else return task;
        }),
      };
    case UPDATE_GROUP_TASK:
      return { ...state, ...action.newTask };
    default:
      return state;
  }
}

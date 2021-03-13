import axios from "axios";

//ACTIONS
const SET_SINGLE_GROUP = "SET_SINGLE_GROUP";
const ADD_GROUP_TASK = "ADD_GROUP_TASK";

//ACTION CREATORS
export const setSingleGroup = (group) => {
  return {
    type: SET_SINGLE_GROUP,
    group,
  };
};

const addGroupTask = (task) => ({ type: ADD_GROUP_TASK, task });

//THUNK CREATORS
export const fetchSingleGroup = (groupId) => {
  return async (dispatch) => {
    try {
      const { data: group } = await axios.get(`/api/groups/${groupId}`);
      dispatch(setSingleGroup(group));
    } catch (err) {
      console.error("There was a problem fetching this group!");
      console.error(err);
    }
  };
};

export const fetchSingleGroupTasks = (groupId) => {
  return async (dispatch) => {
    try {
      const { data: group } = await axios.get(`/api/groups/${groupId}/tasks`);
      dispatch(setSingleGroup(group));
    } catch (err) {
      console.error("There was a problem fetching this group!");
      console.error(err);
    }
  };
};

export const fetchSingleGroupShopping = (groupId) => {
  return async (dispatch) => {
    try {
      const { data: group } = await axios.get(
        `/api/groups/${groupId}/shopping`
      );
      dispatch(setSingleGroup(group));
    } catch (err) {
      console.error(err);
    }
  };
};

//update group info
export const updateGroupThunk = (group) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/groups/${groupId}`, group);
      dispatch(setSingleGroup(data));
    } catch (error) {
      console.log("error updating group");
    }
  };
};

// add user to group
export const addToGroupThunk = (groupId, email) => {
  return async (dispatch) => {
    try {
      const { data: newUser } = await axios.post(`/api/groups/${groupId}`, {
        email,
      });
      dispatch(setSingleGroup(newUser));
    } catch (err) {
      console.log(err);
    }
  };
};

//remove user from group
export const deleteFromGroupThunk = (groupId, userId) => {
  return async (dispatch) => {
    try {
      const { data: deletedUser } = await axios.delete(
        `/api/groups/${groupId}/${userId}`
      );
      dispatch(setSingleGroup(deletedUser));
    } catch (err) {
      console.log(err);
    }
  };
};

// add task to group
export const addGroupTaskThunk = (groupId, task) => async (dispatch) => {
  try {
    const { data: newGroupTask } = await axios.post(
      `/api/groups/${groupId}/tasks`,
      task
    );
    dispatch(addGroupTask(newGroupTask));
  } catch (error) {
    console.error("Error adding task!");
    console.error(error);
  }
};

export const addGroupItemThunk = (groupId, task) => async (dispatch) => {
    const { data: newGroupTask } = await axios.post(
      `/api/groups/${groupId}/shopping`,
      task
    );
    dispatch(addGroupTask(newGroupTask));
};

//INITIAL STATE
const initialState = {};

//REDUCER

const singleGroupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_GROUP:
      return action.group;
    case ADD_GROUP_TASK:
      return { ...state, ...action.task };
    default:
      return state;
  }
};

export default singleGroupReducer;

import axios from "axios";

/**
 * ACTION TYPES
 */

const GET_GROUPS = "GET_GROUPS";
const ADD_GROUP = "ADD_GROUP";
const DELETE_GROUP = "DELETE_GROUP";
const GET_GROUP_USERS = "GET_GROUP_USERS";

/**
 * INITIAL STATE
 */

const initialState = [];

/**
 * ACTION CREATORS
 */
const getGroups = (groups) => ({ type: GET_GROUPS, groups });
const addGroup = (group) => ({ type: ADD_GROUP, group });
const deleteGroup = (groupId) => ({ type: DELETE_GROUP, groupId });
const setGroupUsers = (groups) => ({ type: GET_GROUP_USERS, groups });

/**
 * THUNK CREATORS
 */

export const fetchGroupsThunk = () => async (dispatch) => {
    const { data: groups } = await axios.get(`/api/groups`);
    dispatch(getGroups(groups));
};

export const fetchGroupUsersThunk = (groupId) => {
  return async (dispatch) => {
      const { data: groups } = await axios.get(
        `/api/groups/${groupId}/tasks/add`
      );
      dispatch(setGroupUsers(groups));
  }
};

export const addGroupThunk = (group) => async (dispatch) => {
  try {
    const { data: newGroup } = await axios.post("/api/groups", group);
    dispatch(addGroup(newGroup));
  } catch (error) {
    console.error("Error adding group!");
    console.error(error);
  }
};

export const removeGroupThunk = (groupId) => async (dispatch) => {
  try {
    await axios.delete(`/api/groups/${groupId}`);
    dispatch(deleteGroup(groupId));
  } catch (error) {
    console.error("Error deleting group!");
    console.error(error);
  }
};

export default function groupsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_GROUPS:
      return action.groups;
    case ADD_GROUP:
      return [...state, action.group];
    case DELETE_GROUP:
      return [...state];
    case GET_GROUP_USERS:
      return action.groups;
    default:
      return state;
  }
}

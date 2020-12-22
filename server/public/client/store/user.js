import axios from "axios";
import history from "../history";

/**
 * ACTION TYPES
 */
const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";
const ADD_USER = "ADD_USER";
const UPDATE_USER = "UPDATE_USER";
const UPDATE_PASSWORD = "UPDATE_PASSWORD";

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = (user) => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
const addUser = (user) => ({ type: ADD_USER, user });
const updateUser = (user) => ({ type: UPDATE_USER, user });
const updatePassword = (user) => ({ type: UPDATE_PASSWORD, user });
/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  try {
    const res = await axios.get("/auth/me");
    dispatch(getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const auth = (
  email,
  password,
  method,
  firstName,
  lastName,
  avatarUrl
) => async (dispatch) => {
  let res;
  try {
    res = await axios.post(`/auth/${method}`, {
      email,
      password,
      name,
      firstName,
      lastName,
      avatarUrl,
    });
    history.push("/home");
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }
  try {
    dispatch(getUser(res.data));
    history.push("/home");
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const fetchUserThunk = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${userId}`);
      dispatch(getUser(data));
    } catch (error) {
      console.log("error editing user info");
    }
  };
};

export const updateUserThunk = (
  userId,
  firstName,
  lastName,
  email,
  avatarUrl
) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/users/${userId}`, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        avatarUrl: avatarUrl,
      });

      dispatch(updateUser(data));
    } catch (error) {
      console.log("error editing user info");
    }
  };
};

export const updateUserPoints = (userId, firstName, lastName, email) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/users/${userId}`, {
        firstName: firstName,
        lastName: lastName,
        email: email,
      });

      dispatch(updateUser(data));
    } catch (error) {
      console.log("error editing user info");
    }
  };
};

export const updatePasswordThunk = (userId, oldPassword, newPassword) => async (
  dispatch
) => {
  try {
    const { updateData } = await axios.put(`/api/users/${userId}`, {
      password: newPassword,
    });
    dispatch(updatePassword(updateData));
  } catch (error) {
    console.error(error);
  }
};
export const logout = () => async (dispatch) => {
  try {
    await axios.post("/auth/logout");
    dispatch(removeUser());
    history.push("/login");
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    case ADD_USER:
      return [...state, action.user];
    case UPDATE_USER:
      return action.user;
    default:
      return state;
  }
}

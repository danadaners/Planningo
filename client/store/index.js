import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import user from "./user";
import tasks from "./tasks";
import singleTask from "./singletask";
import groups from "./allGroups";
import singleGroup from "./singleGroup";
import points from "./point";

// const loadState = () => {
//   try {
//     const serializedState = localStorage.getItem('state');
//     if(serializedState === null) {
//       return undefined;
//     }
//     return JSON.parse(serializedState);
//   } catch (e) {
//     return undefined;
//   }
// };

// const saveState = (state) => {
//   try {
//     const serializedState = JSON.stringify(state);
//     localStorage.setItem('state', serializedState);
//   } catch (e) {
//     // Ignore write errors;
//   }
// };

// const persistedState = loadState();

const reducer = combineReducers({
  user,
  singleTask,
  tasks,
  groups,
  singleGroup,
  points,
});

// const middleware = composeWithDevTools(
//   applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
// );

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
));

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
export * from "./user";

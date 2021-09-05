import { combineReducers } from "redux";
import Login from "./Login";
import Bank from "./Bank";

const appReducer = combineReducers({ Login, Bank });

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    localStorage.removeItem("persistantState:root");
    state = undefined;
  }

  return appReducer(state, action);
};
export default rootReducer;

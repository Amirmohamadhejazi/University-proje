import { combineReducers } from "@reduxjs/toolkit";
import HomeSlice from "./Home/HomeSlice";
import LoginSlice from "./Login/LoginSlice";
import ProfileSlice from "./Profile/ProfileSlice";
import ChangeEmailSlice from "./ChangeEmail/ChangeEmailSlice";
import ChangePasswordSlice from "./ChangePassword/ChangePasswordSlice";

const reducers = combineReducers({
  HomeSlice,
  LoginSlice,
  ProfileSlice,
  ChangeEmailSlice,
  ChangePasswordSlice,
});
export default reducers;

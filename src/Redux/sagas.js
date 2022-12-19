/* eslint-disable no-unused-vars */

import { all } from "redux-saga/effects";

import Home from "./Home/saga";
import Login from "./Login/saga";
import Profile from "./Profile/saga";
import ChangeEmail from "./ChangeEmail/saga";
import ChangePassword from "./ChangePassword/saga";
export default function* rootSaga(getState) {
  yield all([
    Home(),
    Login(),
    Profile(),
    ChangeEmail(),
    ChangePassword(),
  ]);
}

import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
    PasswordChange,
    SetPasswordChange,
    loadingPassword
} from "./ChangePasswordSlice";
import api from "../../constants/api";
import {NotificationManager} from "react-notifications";
import {loadingEmail} from "../ChangeEmail/ChangeEmailSlice";

export function* watchPasswordChange() {
    yield takeEvery(PasswordChange.type, GetDataPasswordChange);
}
const GetDataPasswordChangeAsync = async (data) =>
await api
    .patch("/users/me/reset",data)
    .then((data) => data)
    .catch((error) => error);

function* GetDataPasswordChange({ payload }) {
    try {
        const PasswordChange = yield call(GetDataPasswordChangeAsync, payload);
        console.log(PasswordChange)
        if (PasswordChange.status === 200) {
            console.log(PasswordChange.data)
            yield put(SetPasswordChange(1));
            yield put(loadingPassword(false));
            NotificationManager.success(<span>پیام تغییر پسورد</span> , <span>پسورد شما با موفقیت تغییر یافت</span> , 2000);
        }
        if (PasswordChange.response.status === 4001) {
            yield put(loadingPassword(false));
            NotificationManager.error(<span>پیام تغییر پسورد</span> , <span>پسورد قدیمی شما اشتباه است</span> , 2000);
        }
        if (PasswordChange.response.status === 5001) {
            yield put(loadingPassword(false));
            NotificationManager.success(<span>پیام تغییر پسورد</span> , <span>لینک شما منقضی شده و مشکل دارد</span>  , 2000);
        }
        if (PasswordChange.response.status === 400) {
            yield put(loadingPassword(false));
            NotificationManager.error(<span>پیام تغییر پسورد</span> , <span>لینک شما منقضی شده و مشکل دارد</span>  , 2000);
        }
        else {
            yield put(loadingPassword(false));
        }
    } catch (error) {
        console.log(error);
        yield put(loadingPassword(false));
    }
}




export default function* rootSaga() {
    yield all([
        fork(watchPasswordChange),
    ]);
}

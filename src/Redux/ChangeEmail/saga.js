import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
EmailChange,
    SetEmailChange,
    loadingEmail
} from "./ChangeEmailSlice";
import api from "../../constants/api";
import {NotificationManager} from "react-notifications";

export function* watchEmailChange() {
    yield takeEvery(EmailChange.type, GetDataEmailChange);
}
const GetEmailChangeAsync = async (data) =>
    await api
    .patch("/users/me/email",data)
    .then((data) => data)
    .catch((error) => error);

function* GetDataEmailChange({ payload }) {
    try {
        const EmailChange = yield call(GetEmailChangeAsync, payload);
        console.log(EmailChange)
        if (EmailChange.data.code === 200) {
            console.log(EmailChange.data)
            yield put(SetEmailChange(1));
            yield put(loadingEmail(false));
            NotificationManager.success(<span>پیام تغییر ایمیل</span> , <span>ایمیل شما با موفقیت تغییر یافت</span> , 2000);
        }
        if (EmailChange.data.code === 4001) {
            yield put(loadingEmail(false));
            NotificationManager.success(<span>پیام تغییر ایمیل</span> , <span>پسورد اشتباه است</span> , 2000);
        }
        if (EmailChange.data.code === 4002) {
            yield put(loadingEmail(false));
            NotificationManager.success(<span>پیام تغییر ایمیل</span> , <span>این ایمیل وجود دارد ایمیل دیگری وارد کنید</span> , 2000);
        }
        if (EmailChange.data.code === 5001) {
            yield put(loadingEmail(false));
            NotificationManager.success(<span>پیام تغییر ایمیل</span> , <span>لینک شما منقضی شده و مشکل دارد</span>  , 2000);
        }
        else {
            console.log(EmailChange);
            yield put(loadingEmail(false));
        }
    } catch (error) {
        console.log(error);
        yield put(loadingEmail(false));
    }
}




export default function* rootSaga() {
    yield all([
        fork(watchEmailChange),
    ]);
}

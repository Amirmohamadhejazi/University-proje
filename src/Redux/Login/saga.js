import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
    Register,
    login,
    SendPassword,
    ChangePassword,
    LoginLoading,
    LoginStep
} from "./LoginSlice";
import Cookies from 'universal-cookie';
import api from "../../constants/api";
import {LoginWebhook} from "../../constants/HelperFunction"
import {NotificationManager} from "react-notifications";


export function* GetRegisterUser() {
    yield takeEvery(Register.type, GetDataRegisterUser);
}
const GetRegisterUserAsync = async (data) =>
    await api
        .post("/auth/register",data)
        .then((data) => data)
        .catch((error) => error);

function* GetDataRegisterUser({ payload }) {
    try {
        const GetRegister = yield call(GetRegisterUserAsync, payload);
        if (GetRegister.status === 201) {
            console.log(GetRegister)
            LoginWebhook({payload})
            yield put(LoginStep({Step : true , Token:GetRegister.data.auth_token}));
            NotificationManager.success(<span>پیام ریجستر</span> , <span>ریجستر شدید، وارد شوید</span> , 2000);
            yield put(LoginLoading(false));
        }
        if (GetRegister.response.status === 401) {
            yield put(LoginLoading(false));
            console.log(GetRegister)
            NotificationManager.error(<span>پیام ریجستر</span> , <span>ریجستر نشدید، دوباره تلاش کنید</span> , 2000);
        }
        if (GetRegister.response.status === 409) {
            yield put(LoginLoading(false));
            console.log(GetRegister)
            NotificationManager.error(<span>پیام ریجستر</span> , <span>ریجستر نشدید، ایمیل وجود دارد</span> , 2000);
        }
        if (GetRegister.response.status === 400) {
            yield put(LoginLoading(false));
            console.log(GetRegister)
            NotificationManager.error(<span>پیام ریجستر</span> , <span>ریجستر نشدید، ایمیل و پسورد را وارد کنید</span> , 2000);
        }
        else {
            yield put(LoginLoading(false));
            console.log(GetRegister)
        }
    } catch (error) {
        yield put(LoginLoading(false));
    }
}

export function* GetLogin() {
    yield takeEvery(login.type, GetDataLoginUser);
}
const GetLoginUserAsync = async (data) =>
    await api
        .post("/auth/login",data)
        .then((data) => data)
        .catch((error) => error);

function* GetDataLoginUser({ payload }) {
    try {
        const GetLogin = yield call(GetLoginUserAsync, payload);
        if (GetLogin.status === 200) {
            yield put(LoginLoading(false));
            yield put(LoginStep({Step : true , Token:GetLogin.data.auth_token}));
            console.log(GetLogin)
            NotificationManager.success(<span>پیام ورود</span> , <span>وارد شدید</span> , 2000);
        }
        if (GetLogin.response.status === 400) {
            yield put(LoginLoading(false));
            NotificationManager.error(<span>پیام ورود</span> , <span>وارد نشدید، ایمیل یا رمز اشتباه است</span> , 2000);
        }
        else {
            yield put(LoginLoading(false));
            console.log(GetLogin)
        }
    } catch (error) {
        yield put(LoginLoading(false));
    }
}

export function* GetPassword() {
    yield takeEvery(ChangePassword.type, GetPasswordUser);
}
const GetPasswordUserAsync = async (data) =>
    // console.log(data)
    await api
        .post("/users/me/forget",data)
        .then((data) => data)
        .catch((error) => error);

function* GetPasswordUser({ payload }) {
    try {
        const GetPassword = yield call(GetPasswordUserAsync, payload);
        console.log(GetPassword.response.data.status)
        if (GetPassword.status === 200) {
            NotificationManager.success(<span>پیام ارسال لینک ریست پسورد </span> , <span>لینک ریست پسورد ارسال شد</span> , 2000);
            yield put(LoginLoading(false));
            yield put(SendPassword(1));
        }
        if (GetPassword.response.data.code === "4003") {
            NotificationManager.error(<span>پیام ارسال لینک ریست پسورد </span> , <span>این ایمیل وجود ندارد</span> , 2000);
            yield put(LoginLoading(false));
        }else {
            console.log(GetPassword)
            yield put(LoginLoading(false));
        }
    } catch (error) {
        console.log(error)
        yield put(LoginLoading(false));
    }
}

export default function* rootSaga() {
    yield all([
        fork(GetRegisterUser),
        fork(GetLogin),
        fork(GetPassword),
    ]);
}
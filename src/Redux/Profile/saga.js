import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
    getProfileUser,
    SetProfileUser,
    PasswordUser,
    UsernameUser,
    ChangeEmail,
    SendEmail,
    ProfileLoading,
    ChangeAvatarColor,
    setOpenModal
} from "./ProfileSlice";
import {funcLogCookies} from "../../constants/HelperFunction"
import Cookies from 'universal-cookie';
import api from "../../constants/api";
import {NotificationManager} from "react-notifications";
import {SetData} from "../Home/HomeSlice";
const cookies = new Cookies();


export function* GetProfile() {
    yield takeEvery(getProfileUser.type, GetDataProfileUser);
}
const GetProfileUserAsync = async (data) =>
    await api
        .get("/users/me",{headers:{Authorization:localStorage.getItem('TokenDedsecUser')}})
        .then((data) => data)
        .catch((error) => error);

function* GetDataProfileUser({ payload }) {
    try {
        const GetProfile = yield call(GetProfileUserAsync, payload);
        console.log(GetProfile)
        if (GetProfile.status === 200) {
            console.log(GetProfile)
            yield put(SetProfileUser(GetProfile.data));
        }else{
            console.log(GetProfile)
        }
    } catch (error) {
        NotificationManager.error(<span>پیام دریافت پروفایل</span> , <span>پروفایل لود نشد</span> , 2000);
    }
}

export function* SetUserName() {
    yield takeEvery(UsernameUser.type, SetDataUserName);
}
const SetDataUserNameAsync = async (data) =>
    await api
        .patch("/users/me/username",data,{headers:{Authorization:localStorage.getItem('TokenDedsecUser')}})
        .then((data) => data)
        .catch((error) => error);

function* SetDataUserName({ payload }) {
    try {
        const UserName = yield call(SetDataUserNameAsync, payload);
        console.log(UserName)
        if (UserName.status === 200) {
            yield put(getProfileUser());
            yield put(ProfileLoading(false));
            console.log(UserName)
            NotificationManager.success(<span>پیام تغییر یوزر نیم</span> , <span>یوزر نیم با موفقیت تغییر یافت</span> , 2000);
        }else {
            console.log(UserName)
            yield put(ProfileLoading(false));
        }
    } catch (error) {
        yield put(ProfileLoading(false));
        NotificationManager.error(<span>پیام تغییر یوزر نیم</span> , <span>تغییر یوزرنیم با مشکل روبرو شد</span> , 2000);
    }
}
export function* SetPassword() {
    yield takeEvery(PasswordUser.type, SetDataPassword);
}
const SetDataPasswordAsync = async (data) =>
    await api
        .patch("/users/me/password",data,{headers:{Authorization:localStorage.getItem('TokenDedsecUser')}})
        .then((data) => data)
        .catch((error) => error);

function* SetDataPassword({ payload }) {
    try {
        const Password = yield call(SetDataPasswordAsync, payload);
        console.log(Password)
        if (Password.status === 200) {
            yield put(ProfileLoading(false));
            // yield put(setOpenModal(false));
            console.log(Password)
            // cookies.set("Token", Password.data.auth_token);
            localStorage.setItem('TokenDedsecUser', JSON.stringify(Password.data.auth_token));
            NotificationManager.success(<span>پیام تغییر پسورد</span> , <span>پسورد با موفقیت تغییر یافت</span> , 2000);
        }else {
            console.log(Password)
            yield put(ProfileLoading(false));
        }
    } catch (error) {
        yield put(ProfileLoading(false));
        NotificationManager.error(<span>پیام تغییر پسورد</span> , <span>تغییر پسورد با مشکل روبرو شد</span> , 2000);
    }
}
export function* SetEmail() {
    yield takeEvery(ChangeEmail.type, SetDataEmail);
}
const SetDataEmailAsync = async (data) =>
    await api
        .post("/users/me/sendmail","",{headers:{Authorization:localStorage.getItem('TokenDedsecUser')}})
        .then((data) => data)
        .catch((error) => error);

function* SetDataEmail({ payload }) {
    try {
        const EmailChanged = yield call(SetDataEmailAsync, payload);
        console.log(EmailChanged)
        if (EmailChanged.status === 200) {
            yield put(SendEmail(1));
            yield put(ProfileLoading(false));
            console.log(EmailChanged)
            NotificationManager.success(<span>پیام تغییر ایمیل</span> , <span>ایمیل به شما ارسال شد</span> , 2000);
        }else {
            console.log(EmailChanged)
            yield put(ProfileLoading(false));
        }
    } catch (error) {
        yield put(ProfileLoading(false));
        NotificationManager.error(<span>پیام تغییر ایمیل</span> , <span>ارسال لینک به ایمیل شما با مشکل روبرو شد</span> , 2000);
    }
}

export function* SetAvatarColor() {
    yield takeEvery(ChangeAvatarColor.type, SetDataAvatarColor);
}
const SetDataAvatarColorAsync = async (data) =>
    await api
        .patch("/users/me/avatar",data,{headers:{Authorization:localStorage.getItem('TokenDedsecUser')}})
        .then((data) => data)
        .catch((error) => error);

function* SetDataAvatarColor({ payload }) {
    try {
        const AvatarColorChanged = yield call(SetDataAvatarColorAsync, payload);
        console.log(AvatarColorChanged)
        if (AvatarColorChanged.status === 200) {
            yield put(ProfileLoading(false));
            yield put(getProfileUser());
            yield put(setOpenModal(false));
            console.log(AvatarColorChanged)
            NotificationManager.success(<span>پیام تغییر آواتار و رنگ</span> , <span>آواتار و رنگ مورد نظر شما ذخیر شد</span> , 2000);
        }else {
            console.log(AvatarColorChanged)
            yield put(ProfileLoading(false));
        }
    } catch (error) {
        yield put(ProfileLoading(false));
        NotificationManager.error(<span>پیام تغییر آواتار و رنگ</span> , <span>تغییر آواتار و رنگ موردنظر شما با مشکل روبرو شد</span> , 2000);
    }
}

export default function* rootSaga() {
    yield all([
        fork(GetProfile),
        fork(SetUserName),
        fork(SetPassword),
        fork(SetEmail),
        fork(SetAvatarColor),
    ]);
}
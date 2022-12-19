import { createSlice } from "@reduxjs/toolkit";

const LoginSlice = createSlice({
    name: "LoginSlice",
    initialState: {
        loading: false,
        IpUSerLoc:null,
        PasswordPosition:0,
        loginRegisterStep:false,
        TokenStep:null
    },
    reducers: {

        LoginLoading(state, action) {
            return { ...state, loading: action.payload  };
        },
        LoginStep(state, action) {
            return { ...state, loginRegisterStep: action.payload.Step ,TokenStep:action.payload.Token };
        },
        getIpUser(state, action) {
            return { ...state};
        },
        SetIpUser(state, action) {
            return {...state, IpUSerLoc:action.payload};
        },
        login(state, action) {
            return { ...state};
        },
        Register(state, action) {
            return { ...state};
        },
        // position (number step for send email for Password)
        SendPassword(state, action) {
            return {...state, PasswordPosition:action.payload};
        },
        // position (send email link for change Password)
        ChangePassword(state, action) {
            return {...state};
        }
    },
});

export const {
    LoginLoading,
    getIpUser,
    SetIpUser,
    LoginStep,
    login,
    Register,
    SendPassword,
    ChangePassword,
} =
    LoginSlice.actions;

export default LoginSlice.reducer;

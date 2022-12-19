import { createSlice } from "@reduxjs/toolkit";

const ChangeEmail = createSlice({
    name: "ChangePassword",
    initialState: {
        loading: false,
        positionPasswordChange:0
    },
    reducers: {
        loadingPassword(state, action) {
            return { ...state,loading:action.payload};
        },
        PasswordChange(state, action) {
            return { ...state};
        },
        SetPasswordChange(state, action) {
            return { ...state,positionEmailChange:action.payload};
        }

    },
});

export const {
    PasswordChange,
    SetPasswordChange,
    loadingPassword
} =
    ChangeEmail.actions;

export default ChangeEmail.reducer;

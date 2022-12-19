import { createSlice } from "@reduxjs/toolkit";

const ChangeEmail = createSlice({
    name: "ChangeEmail",
    initialState: {
        loading: false,
        positionEmailChange:0
    },
    reducers: {
        loadingEmail(state, action) {
            return { ...state,loading:action.payload};
        },
        EmailChange(state, action) {
            return { ...state};
        },
        SetEmailChange(state, action) {
            return { ...state,positionEmailChange:action.payload};
        }

    },
});

export const {
    loadingEmail,
    EmailChange,
    SetEmailChange,
} =
    ChangeEmail.actions;

export default ChangeEmail.reducer;
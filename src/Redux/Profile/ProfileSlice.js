import { createSlice } from "@reduxjs/toolkit";

const ProfileSlice = createSlice({
    name: "ProfileSlice",
    initialState: {
        loading: false,
        DataProfile:null,
        EmailPosition:0,
        ModalProfile:false,
        ModalNumberProfile:0,
    },
    reducers: {

        ProfileLoading(state, action) {
            return { ...state, loading: action.payload  };
        },
        getProfileUser(state, action) {
            return { ...state};
        },
        SetProfileUser(state, action) {
            return { ...state, DataProfile:action.payload  };
        },
        PasswordUser(state, action) {
            return { ...state};
        },
        UsernameUser(state, action) {
            return { ...state};
        },
        // position (number step for send email)
        SendEmail(state, action) {
            return {...state, EmailPosition:action.payload};
        },
        // position (send email link for change email)
        ChangeEmail(state, action) {
            return {...state};
        },

        ChangeAvatarColor(state, action) {
            return {...state};
        },
        setOpenModal(state, action) {
            return {...state , ModalProfile:action.payload.modal  , ModalNumberProfile:action.payload.number };
        }
    },
});

export const {
    ProfileLoading,
    getProfileUser,
    SetProfileUser,
    PasswordUser,
    UsernameUser,
    SendEmail,
    ChangeEmail,
    ChangeAvatarColor,
    setOpenModal,
} =
    ProfileSlice.actions;

export default ProfileSlice.reducer;

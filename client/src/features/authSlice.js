import { createSlice } from '@reduxjs/toolkit'
// import { authApi } from './api/authApi.js'
const initialState = {
    user: null,
    isAuthenticated: false,
};
const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            // console.log("Payload in reducer:", action.payload);
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        userLoggedOut: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        }
    },


});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer;
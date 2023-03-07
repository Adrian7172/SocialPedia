import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    mode: "light",
    userData: null,
    post: [],
    friends: [],
    token: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.userData = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: () => initialState,
        setPost: (state, action) => {
            state.post = action.payload
        }
    }
})

export const { setMode, setLogin, setLogout, setPost } = authSlice.actions;

export default authSlice.reducer;
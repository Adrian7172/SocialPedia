import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    mode: "light",
    user: null,
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
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: () => initialState,
    }
})

export const { setMode, setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;
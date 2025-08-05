import { configureStore } from "@reduxjs/toolkit";
import userSlice from '../features/userinfo.js';
import modeSlice from '../features/mode.js';

export const store = configureStore({
    reducer:{
        user: userSlice,
        mode: modeSlice
    }
})
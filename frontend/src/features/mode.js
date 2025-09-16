import { createSlice } from "@reduxjs/toolkit";


const modeSlice = createSlice({
    name: 'mode',
    initialState:{
        value: 'light'
    },
    reducers:{
        toogleMode:(state, action) =>{
            state.value = action.payload;
            localStorage.setItem('mode', state.value)

        }
    }
})

export const {toogleMode} = modeSlice.actions;
export default modeSlice.reducer;
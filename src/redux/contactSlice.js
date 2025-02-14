import { createSlice } from "@reduxjs/toolkit";

export const contactSlice = createSlice({
    name: "contact",
    initialState: { name:"", email:"", message:""},
    reducers: {
        updateField: (state, action) => {
            state[action.payload.field] = action.payload.value;
        },
    },
});


export const { updateField } = contactSlice.actions;

export default contactSlice.reducer;




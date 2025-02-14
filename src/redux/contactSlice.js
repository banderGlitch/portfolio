import { createSlice } from "@reduxjs/toolkit";

export const contactSlice = createSlice({
    name: "contact",
    initialState: { name:"", email:"", message:""},
    reducers: {
        updateField: (state, action) => {
            state[action.payload.field] = action.payload.value;
        },
        resetForm: (state) => {
            state.name = "";
            state.email = "";
            state.message = "";
        },
    },
});


export const { updateField, resetForm } = contactSlice.actions;

export default contactSlice.reducer;




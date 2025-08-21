import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    stages: [],
    currentStage: null,
};

const stageSlice = createSlice({
    name: "stages",
    initialState,
    reducers: {
        setStages: (state, action) => {
            state.stages = action.payload;
        },

        resetStages: (state) => {
            state.stages = [];
        },

        setCurrentStage: (state, action) => {
            state.currentStage = action.payload;
        },
        resetCurrentStage: (state) => {
            state.currentStage = null;
        }
    },
});

export const { setStages, resetStages, setCurrentStage, resetCurrentStage } = stageSlice.actions;
export default stageSlice.reducer;

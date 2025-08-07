import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    leaderboardList: [],
    leaderboardUser: {}
}

const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState,
    reducers: {
        setLeaderboardList: (state, action) => {
            state.leaderboardList = action.payload;
        },
        setLeaderboardUser: (state, action) => {
            state.leaderboardUser = action.payload;
        },
        resetLeaderboardUser: (state) => {
            state.leaderboardUser = {};
        }
    }
})

export const { setLoading, setLeaderboardList, setLeaderboardUser, resetLeaderboardUser } = leaderboardSlice.actions;

export default leaderboardSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser : null,
    currentPhase: null
  },
  reducers: {
    signIn: (state, action) => {
        state.currentUser = action.payload
    },
    setCurrentPhase: (state, action) => {
      state.currentPhase = action.payload
    },
    signOut: (state) => {
        state.currentUser = null;
    }
  }
});

export const { signIn, signOut, setCurrentPhase } = authSlice.actions;

export default authSlice.reducer;
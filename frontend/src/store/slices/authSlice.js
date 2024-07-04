import { createSlice } from "@reduxjs/toolkit";
import { deleteUserProfile, fetchProfile, login, registerUser, updateUserProfile } from "../thunks/authThunk";
import { addNewUser, deleteProfileById, fetchAllProfiles, updateProfileById } from "../thunks/adminThunk";


const authSlice = createSlice({
  name: "AUTH",
  initialState: {
    isAuthenticated: !!localStorage.getItem("authToken"),
    userRole: localStorage.getItem("userRole") || null,
    user: null,
    allUsers: null,
    isLoading: false,
    userCount: null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userRole");
      state.isAuthenticated = false;
      state.userRole = null;
      state.user = null;
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // for USER login -- USER/ADMIN
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.userRole = action.payload.user.role;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // for USER registration -- USER
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.userRole = action.payload.user.role;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // for USER update Profile --USER
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // for Fetch profile -- USER
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // for DELETE user profile -- USER
      .addCase(deleteUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUserProfile.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(deleteUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // for ADD new user -- ADMIN
      .addCase(addNewUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allUsers = action.payload.allUsers;
      })
      .addCase(addNewUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // for Fetch all profiles -- ADMIN
      .addCase(fetchAllProfiles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllProfiles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allUsers = action.payload.allUsers;
        state.userCount = action.payload.userCount;
      })
      .addCase(fetchAllProfiles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // for UPDATE user profile -- ADMIN
      .addCase(updateProfileById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfileById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allUsers = action.payload.allUsers;
      })
      .addCase(updateProfileById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // for DELETE user profile -- ADMIN
      .addCase(deleteProfileById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProfileById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allUsers = action.payload.allUsers;
      })
      .addCase(deleteProfileById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

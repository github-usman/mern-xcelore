import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginService, fetchProfileService, userRegisterService, deleteProfileService, userUpdateProfileService } from "../../services/authService";
//**************** */ USER CRUD THUNK/Middleware **************************************

// LOGIN -- ADMIN/USER
export const login = createAsyncThunk(
  "AUTH/LOGIN",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      return await loginService({ email, password });
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

// READ profile -- ADMIN/USER
export const fetchProfile = createAsyncThunk(
  "AUTH/FETCH_PROFILE",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchProfileService();
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

// CREATE NEW user -- USER
export const registerUser = createAsyncThunk(
  "AUTH/REGISTER_USER",
  async ({ first_name, last_name, email, password }, { rejectWithValue }) => {
    try {
      return await userRegisterService({ first_name, last_name, email, password });
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

// DELETE Existing user -- USER
export const deleteUserProfile = createAsyncThunk(
  "AUTH/DELETE_USER_PROFILE",
  async (_, { rejectWithValue }) => {
    try {
      return await deleteProfileService();
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

// UPDATE user profile -- USER
export const updateUserProfile = createAsyncThunk(
  "AUTH/UPDATE_USER_PROFILE",
  async ({ first_name, last_name, email }, { rejectWithValue }) => {
    try {
      return await userUpdateProfileService({ first_name, last_name, email });
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

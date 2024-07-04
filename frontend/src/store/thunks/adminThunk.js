import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteProfileByIdService, updateProfileByIdService, fetchAllProfilesService, addNewUserService } from "../../services/adminService";
//*********************** */ admin CRUD THUNK Middleware*********************************

// DELETE user -- ADMIN
export const deleteProfileById = createAsyncThunk(
  "ADMIN/DELETE_PROFILE_BY_ID",
  async ({ id }, { rejectWithValue }) => {
    try {
      return await deleteProfileByIdService(id);
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

// UPDATE user -- ADMIN
export const updateProfileById = createAsyncThunk(
  "ADMIN/UPDATE_PROFILE_BY_ID",
  async ({ id, first_name, last_name, email }, { rejectWithValue, dispatch }) => {
    try {
      return await updateProfileByIdService({ id, first_name, last_name, email });
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

// READ userS -- ADMIN
export const fetchAllProfiles = createAsyncThunk(
  "ADMIN/FETCH_ALL_PROFILES",
  async ({ keyword = "", page = 1 }, { rejectWithValue }) => {
    try {
      return await fetchAllProfilesService({ keyword, page });
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

// CREATE user -- ADMIN
export const addNewUser = createAsyncThunk(
  "ADMIN/ADD_NEW_USER",
  async ({ first_name, last_name, email, password, role }, { rejectWithValue }) => {
    try {
      return await addNewUserService({ first_name, last_name, email, password, role });
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

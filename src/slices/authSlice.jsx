import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

const initialState = {
  user: null,
  username: null,
  chatHistory: [],
  isAuthenticated: false,
  error: null,
};

const setTokenInLocalStorage = (token) => {
  localStorage.setItem("token", token);
};

const clearTokenFromLocalStorage = () => {
  localStorage.removeItem("token");
};

export const signup = createAsyncThunk(
  "auth/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/signup", formData);
      setTokenInLocalStorage(response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/login", formData);
      setTokenInLocalStorage(response.data.token);
      console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.username = action.payload.username;
      state.chatHistory = action.payload.chatHistory;
      state.isAuthenticated = true;
      setTokenInLocalStorage(action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.username = null;
      state.chatHistory = [];
      state.isAuthenticated = false;
      clearTokenFromLocalStorage();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.username = action.payload.username;
        state.chatHistory = [];
        state.error = null;
        setTokenInLocalStorage(action.payload.token);
      })
      .addCase(signup.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.username = null;
        state.chatHistory = [];
        state.error = action.payload;
        clearTokenFromLocalStorage();
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.username = action.payload.username;
        state.chatHistory = action.payload.chatHistory;
        state.error = null;
        setTokenInLocalStorage(action.payload.token);
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.username = null;
        state.chatHistory = [];
        state.error = action.payload;
        clearTokenFromLocalStorage();
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

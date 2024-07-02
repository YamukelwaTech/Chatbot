import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const initialState = {
  user: null,
  username: null,
  chatHistory: [],
  isAuthenticated: false,
  error: null,
  loading: true,
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
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await axios.get("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
    logout: (state) => {
      state.user = null;
      state.username = null;
      state.chatHistory = [];
      state.isAuthenticated = false;
      state.loading = false;
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
        state.loading = false;
        setTokenInLocalStorage(action.payload.token);
      })
      .addCase(signup.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.username = null;
        state.chatHistory = [];
        state.error = action.payload;
        state.loading = false;
        clearTokenFromLocalStorage();
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.username = action.payload.username;
        state.chatHistory = action.payload.chatHistory;
        state.error = null;
        state.loading = false;
        setTokenInLocalStorage(action.payload.token);
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.username = null;
        state.chatHistory = [];
        state.error = action.payload;
        state.loading = false;
        clearTokenFromLocalStorage();
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.username = action.payload.username;
        state.chatHistory = action.payload.chatHistory;
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.username = null;
        state.chatHistory = [];
        state.error = action.payload;
        state.loading = false;
        clearTokenFromLocalStorage();
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

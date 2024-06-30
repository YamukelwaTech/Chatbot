import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  status: 'idle',
  error: null,
};

export const deleteChatAsync = createAsyncThunk(
  'chat/deleteChat',
  async (chatId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/api/chat/${chatId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete chat');
      }
      return chatId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteChatAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteChatAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.messages = state.messages.filter(
          (message, index) => index !== action.payload
        );
      })
      .addCase(deleteChatAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;

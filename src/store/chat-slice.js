import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import chatService from "../services/chatService";

const initialState = {
  status: "idle",
  rooms: [],
  activeRoomId: null,
  error: null,
};

export const fetchChatRoomsAsync = createAsyncThunk(
  "chat/fetchChatRoomsAsync",
  async (_, thunkAPI) => {
    try {
      return await chatService.getChats();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setAllChats: (state, action) => {
      state.rooms = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChatRoomsAsync.pending, (state) => {
      state.status = "pendingFetchRooms";
      state.error = null;
    });
    builder.addCase(fetchChatRoomsAsync.fulfilled, (state, action) => {
      state.rooms = action.payload;
      state.status = "idle";
      state.error = null;
    });
    builder.addCase(fetchChatRoomsAsync.rejected, (state, action) => {
      state.status = "idle";
      state.error = "Fetch error" + action.payload
    });
  },
});

export const chatActions = chatSlice.actions;
export const chatReducers = chatSlice.reducer;

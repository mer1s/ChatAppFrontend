import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import chatService from "../services/chatService";

const initialState = {
  status: "idle",
  rooms: [],
  activeRoom: null,
  error: null,
  // Hub connection
  connection: null,
  // List of room messages
  messages: [],
  // All active user connections to rooms
  connections: [],
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

export const createChatRoomAsync = createAsyncThunk(
  "chat/createChatRoomAsync",
  async (payload, thunkAPI) => {
    try {
      return await chatService.createChat(payload);
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
    setRoom: (state, action) => {
      state.activeRoom = action.payload;
    },
    deleteActiveRoom: (state, action) => {
      state.activeRoom = null;
    },
    // Set hub connection
    setConnection: (state, action) => {
      state.connection = action.payload;
    },
    // New message sent from user
    newMessage: (state, action) => {
      if (action.payload.changedRoom) {
        state.messages = [];
      } else {
        state.messages = [...state.messages, action.payload];
      }
    },
    saveContextId: (state, action) => {
      // Check is empty array
      // If array is not empty, check is connection for specific room and specific user already added
      if (state.connections.length > 0) {
        if (
          !state.connections.some(
            (e) => e.connId === action.payload && e.roomId === state.activeRoom
          )
        ) {
          state.connections.push({
            connId: action.payload.connId,
            roomId: state.activeRoom.id,
            userId: action.payload.userId,
          });
        }
      } else {
        // If array is empty, add connection
        state.connections.push({
          connId: action.payload.connId,
          roomId: state.activeRoom.id,
          userId: action.payload.userId,
        });
      }
    },
    // Set messages fetched from backend for specific room
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch chat rooms
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
      state.error = "Fetch error" + action.payload;
    });

    // Add chat room
    builder.addCase(createChatRoomAsync.pending, (state) => {
      state.status = "pendingAddRoom";
      state.error = null;
    });
    builder.addCase(createChatRoomAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.rooms = [...state.rooms, action.payload];
      state.error = null;
    });
    builder.addCase(createChatRoomAsync.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload;
    });
  },
});

export const chatActions = chatSlice.actions;
export const chatReducers = chatSlice.reducer;

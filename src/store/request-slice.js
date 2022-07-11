import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestService from "../services/requestService";

const initialState = {
  requests: null,
  status: "idle",
  error: null,
  chosenRoom: null,
  roomsForWhichRequestExist: null,
};

export const fetchRequestsAsync = createAsyncThunk(
  "requests/fetchChatRoomsAsync",
  async (_, thunkAPI) => {
    try {
      return await requestService.getRequests();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const createJoinRequestAsync = createAsyncThunk(
  "requests/createJoinRequestAsync",
  async (payload, thunkAPI) => {
    try {
      return await requestService.sendJoinRequest(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const fetchRoomsForWhichRequestExistAsync = createAsyncThunk(
  "requests/fetchRoomsForWhichRequestExistAsync",
  async (_, thunkAPI) => {
    try {
      return await requestService.getRoomsForWhichRequestExist();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

const requestslice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    chooseRoom: (state, action) => {
      state.chosenRoom = action.payload;
    },
    onEmptyRoom: (state, action) => {
      state.roomsForWhichRequestExist = state.roomsForWhichRequestExist.filter(
        (room) => room.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    // Fetch All Requests
    builder.addCase(fetchRequestsAsync.pending, (state) => {
      state.status = "pendingFetchRequests";
      state.error = null;
    });
    builder.addCase(fetchRequestsAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.requests = action.payload;
      state.error = null;
    });
    builder.addCase(fetchRequestsAsync.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload;
    });

    // Create join request
    builder.addCase(createJoinRequestAsync.pending, (state) => {
      state.status = "pendingAddRoom";
      state.error = null;
    });
    builder.addCase(createJoinRequestAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.requests = [...state.requests, action.payload];
      state.error = null;
    });
    builder.addCase(createJoinRequestAsync.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload;
    });

    // Get rooms for which request exist
    builder.addCase(fetchRoomsForWhichRequestExistAsync.pending, (state) => {
      state.status = "pendingFetchRoomsForWhichRequestExist";
      state.error = null;
    });
    builder.addCase(
      fetchRoomsForWhichRequestExistAsync.fulfilled,
      (state, action) => {
        state.status = "idle";
        state.roomsForWhichRequestExist = action.payload;
        state.error = null;
      }
    );
    builder.addCase(
      fetchRoomsForWhichRequestExistAsync.rejected,
      (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      }
    );
  },
});

export const requestActions = requestslice.actions;
export const requestsReducers = requestslice.reducer;

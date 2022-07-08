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

export const acceptCustomerRequestAsync = createAsyncThunk(
  "requests/acceptCustomerRequestAsync",
  async (payload, thunkAPI) => {
    try {
      return await requestService.sendAcceptCustomerRequest(payload);
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

    // Accept customer request
    builder.addCase(acceptCustomerRequestAsync.pending, (state) => {
      state.status = "pendingAcceptCustomerRequest";
      state.error = null;
    });
    builder.addCase(acceptCustomerRequestAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.requests = state.requests.filter(
        (request) => request.id !== action.payload
      );
      state.error = null;
    });
    builder.addCase(acceptCustomerRequestAsync.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload;
    });

    // Get rooms for which request exist
    builder.addCase(fetchRoomsForWhichRequestExistAsync.pending, (state) => {
      state.status = "fetchRoomsForWhichRequestExistPending";
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

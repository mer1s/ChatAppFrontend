import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import chatService from "../services/chatService";


const initialState = {
  status: "idle",
  error: null,
  chosenRoom: null
};

// export const fetchChatRoomsAsync = createAsyncThunk(
//   "chat/fetchChatRoomsAsync",
//   async (_, thunkAPI) => {
//     try {
//       return await chatService.getChats();
//     } catch (error) {
//       return thunkAPI.rejectWithValue({ error });
//     }
//   }
// );

export const createJoinRequestAsync = createAsyncThunk(
  "chat/createJoinRequestAsync",
  async (payload, thunkAPI) => {
    try {
      return await chatService.sendJoinRequest(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

const requestslice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    chooseRoom: (state, action) =>{
        state.chosenRoom = action.payload;
      }
  },
  extraReducers: (builder) => {
    // Create join request
    builder.addCase(createJoinRequestAsync.pending, (state) => {
      state.requestStatus = "pendingAddRoom";
      state.requestError = null;
    });
    builder.addCase(createJoinRequestAsync.fulfilled, (state, action) => {
      state.requestStatus = "idle";
      state.requestError = null;
    });
    builder.addCase(createJoinRequestAsync.rejected, (state, action) => {
      state.requestStatus = "idle";
      state.requestError = action.payload;
    });
  },
});

export const requestActions = requestslice.actions;
export const requestsReducers = requestslice.reducer;

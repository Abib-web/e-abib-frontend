import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const validateToken = createAsyncThunk('session/validateToken', async (token, thunkAPI) => {
  try {
    const response = await axios.get('http://localhost:3000/api/auth/verifyToken', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    user: null,
    isLoggedIn: false,
    loading: false,
    error: null
  },
  reducers: {
    signUp: (state, action) => {
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    loginUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    setCurrentUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validateToken.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.loading = false;
      })
      .addCase(validateToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.isLoggedIn = false;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      });
  }
});

export const { signUp, loginUser, logOut, setCurrentUser } = sessionSlice.actions;

export const selectCurrentUser = (state) => state.session.user;
export const selectIsLoggedIn = (state) => state.session.isLoggedIn;
export const selectLoading = (state) => state.session.loading;

export default sessionSlice.reducer;

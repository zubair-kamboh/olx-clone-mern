import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import adsService from './adsService'

const initialState = {
  ads: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  successMessage: '',
  errorMessage: '',
  itemUser: {},
}

// POST AD
export const postAd = createAsyncThunk(
  '/api/postad',
  async (data, ThunkAPI) => {
    try {
      return await adsService.postAd(data)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return ThunkAPI.rejectWithValue(message)
    }
  }
)
// GET ADS
export const getAds = createAsyncThunk(
  '/api/getads',
  async (data, ThunkAPI) => {
    try {
      return await adsService.getAds()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return ThunkAPI.rejectWithValue(message)
    }
  }
)
// GET ITEM USER
export const itemUser = createAsyncThunk(
  '/api/getItemUser',
  async (userId, ThunkAPI) => {
    try {
      return await adsService.getItemUser(userId)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return ThunkAPI.rejectWithValue(message)
    }
  }
)

export const authSlice = createSlice({
  name: 'ads',
  initialState,
  reducers: {
    reset: (state) => {
      state.errorMessage = ''
      state.successMessage = ''
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postAd.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
        state.successMessage = ''
        state.errorMessage = ''
      })
      .addCase(postAd.fulfilled, (state, actions) => {
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
        state.successMessage = actions.payload.successMsg
        state.errorMessage = ''
      })
      .addCase(postAd.rejected, (state, actions) => {
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.successMessage = ''
        state.errorMessage = actions.payload
      })
      .addCase(getAds.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
        state.successMessage = ''
        state.errorMessage = ''
      })
      .addCase(getAds.fulfilled, (state, actions) => {
        state.ads = actions.payload
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
        state.successMessage = ''
        state.errorMessage = ''
      })
      .addCase(getAds.rejected, (state, actions) => {
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.successMessage = ''
        state.errorMessage = actions.payload
      })

      // get item user
      .addCase(itemUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(itemUser.fulfilled, (state, actions) => {
        state.itemUser = actions.payload
      })
      .addCase(itemUser.rejected, (state, actions) => {
        state.errorMessage = actions.payload
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer

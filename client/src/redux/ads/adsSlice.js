import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import adsService from './adsService'

const initialState = {
  ads: [],
  filteredAds: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  successMessage: '',
  errorMessage: '',
  itemUser: {},
  place: '',
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
// GET MY ADS
export const myads = createAsyncThunk('/api/myads', async (data, ThunkAPI) => {
  const token = JSON.parse(localStorage.getItem('token'))
  try {
    return await adsService.myads(token)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return ThunkAPI.rejectWithValue(message)
  }
})
// DELETE AD
export const deleteAd = createAsyncThunk(
  '/api/deleteAd',
  async (id, ThunkAPI) => {
    try {
      return await adsService.deleteAd(id)
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

// UPDATE AD
export const updateAd = createAsyncThunk(
  '/api/updateAd',
  async (data, ThunkAPI) => {
    try {
      return await adsService.updateAd(data)
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
      state.ads = []
      state.filteredAds = []
      state.errorMessage = ''
      state.successMessage = ''
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
    },
    resetUserItem: (state) => {
      state.errorMessage = ''
      state.itemUser = {}
    },
    filterAds: (state, action) => {
      const place = action.payload

      if (!place || place.length === 0) {
        state.filteredAds = state.ads
        return
      }

      const filterAds = state.ads.filter((ad) =>
        ad.location.includes(action.payload)
      )

      state.filteredAds = filterAds
    },

    searchFilter: (state, action) => {
      const input = action.payload

      state.filteredAds = state.ads.filter((ad) =>
        ad.title.toLowerCase().includes(input.toLowerCase())
      )
    },

    filterByCategory: (state, action) => {
      state.filteredAds = state.ads.filter(
        (ad) => ad.category === action.payload
      )
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

      // get all ads
      .addCase(getAds.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
        state.successMessage = ''
        state.errorMessage = ''
      })
      .addCase(getAds.fulfilled, (state, actions) => {
        state.ads = actions.payload
        state.filteredAds = actions.payload
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

      // GET MY ADS
      .addCase(myads.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
      })
      .addCase(myads.fulfilled, (state, actions) => {
        state.ads = actions.payload
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
      })
      .addCase(myads.rejected, (state, actions) => {
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.errorMessage = actions.payload
      })

      // DELETE AD
      .addCase(deleteAd.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
      })
      .addCase(deleteAd.fulfilled, (state, actions) => {
        state.successMessage = actions.payload.successMsg
        state.ads = state.ads.filter((ad) => ad._id !== actions.payload.id)
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
      })
      .addCase(deleteAd.rejected, (state, actions) => {
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.errorMessage = actions.payload
      })

      // UPDATE AD
      .addCase(updateAd.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
      })
      .addCase(updateAd.fulfilled, (state, actions) => {
        state.successMessage = actions.payload.successMsg
        console.log(actions.payload)
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
      })
      .addCase(updateAd.rejected, (state, actions) => {
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.errorMessage = actions.payload
      })

      // get item user
      .addCase(itemUser.fulfilled, (state, actions) => {
        state.itemUser = actions.payload
      })
      .addCase(itemUser.rejected, (state, actions) => {
        state.errorMessage = actions.payload
      })
  },
})

export const {
  reset,
  resetUserItem,
  searchFilter,
  filterAds,
  filterByCategory,
} = authSlice.actions
export default authSlice.reducer

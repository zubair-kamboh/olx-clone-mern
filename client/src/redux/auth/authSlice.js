import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isSuccess: false,
  isError: false,
  isLoading: false,
  successMessage: '',
  errorMessage: '',
}

// register
export const register = createAsyncThunk(
  'auth/register',
  async (data, ThunkAPI) => {
    try {
      return await authService.register(data)
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
// activate account
export const activateAccount = createAsyncThunk(
  'auth/activate-account',
  async (token, ThunkAPI) => {
    try {
      return await authService.activateAccount(token)
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

// LOGIN
export const login = createAsyncThunk('auth/login', async (data, ThunkAPI) => {
  try {
    return await authService.login(data)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return ThunkAPI.rejectWithValue(message)
  }
})
// GOOGLE LOGIN
export const googleLogin = createAsyncThunk(
  'auth/googlelogin',
  async (response, ThunkAPI) => {
    try {
      return await authService.googleLogin(response)
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
// FIND ACCOUNT
export const findAccount = createAsyncThunk(
  'auth/find-account',
  async (email, ThunkAPI) => {
    try {
      return await authService.findAccount(email)
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
// CHANGE PASSWORD
export const changePassword = createAsyncThunk(
  'auth/change-password',
  async (data, ThunkAPI) => {
    try {
      return await authService.changePassword(data)
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
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.successMessage = ''
      state.errorMessage = ''
    },
    resetUser: (state) => {
      state.user = null
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.successMessage = ''
      state.errorMessage = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
        state.user = null
        state.isSuccess = false
        state.isError = false
        state.successMessage = ''
        state.errorMessage = ''
      })
      .addCase(register.fulfilled, (state, actions) => {
        state.user = null
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
        state.successMessage = actions.payload.successMsg
        state.errorMessage = ''
      })
      .addCase(register.rejected, (state, actions) => {
        state.user = null
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.successMessage = ''
        state.errorMessage = actions.payload
      })

      // ACITVATE ACCOUNT
      .addCase(activateAccount.pending, (state) => {
        state.isLoading = true
        state.user = null
        state.isSuccess = false
        state.isError = false
        state.successMessage = ''
        state.errorMessage = ''
      })
      .addCase(activateAccount.fulfilled, (state, actions) => {
        state.user = null
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
        state.successMessage = actions.payload.successMsg
        state.errorMessage = ''
      })
      .addCase(activateAccount.rejected, (state, actions) => {
        state.user = null
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.successMessage = ''
        state.errorMessage = actions.payload
      })

      // SIGNIN
      .addCase(googleLogin.pending, (state) => {
        state.isLoading = true
        state.user = null
        state.isSuccess = false
        state.isError = false
        state.successMessage = ''
        state.errorMessage = ''
      })
      .addCase(googleLogin.fulfilled, (state, actions) => {
        state.user = actions.payload.user
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
        state.successMessage = actions.payload.successMsg
        state.errorMessage = ''
      })
      .addCase(googleLogin.rejected, (state, actions) => {
        state.user = null
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.successMessage = ''
        state.errorMessage = actions.payload
      })
      // GOOGLE SIGNIN
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.user = null
        state.isSuccess = false
        state.isError = false
        state.successMessage = ''
        state.errorMessage = ''
      })
      .addCase(login.fulfilled, (state, actions) => {
        state.user = actions.payload.user
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
        state.successMessage = actions.payload.successMsg
        state.errorMessage = ''
      })
      .addCase(login.rejected, (state, actions) => {
        state.user = null
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.successMessage = ''
        state.errorMessage = actions.payload
      })
      // FIND ACCOUNT
      .addCase(findAccount.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
        state.successMessage = ''
        state.errorMessage = ''
      })
      .addCase(findAccount.fulfilled, (state, actions) => {
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
        state.successMessage = actions.payload.successMsg
        state.errorMessage = ''
      })
      .addCase(findAccount.rejected, (state, actions) => {
        console.log(actions)
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.successMessage = ''
        state.errorMessage = actions.payload
      })
      // CHANGE PASSWORD
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
        state.successMessage = ''
        state.errorMessage = ''
      })
      .addCase(changePassword.fulfilled, (state, actions) => {
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
        state.successMessage = actions.payload.successMsg
        state.errorMessage = ''
      })
      .addCase(changePassword.rejected, (state, actions) => {
        console.log(actions)
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.successMessage = ''
        state.errorMessage = actions.payload
      })
  },
})

export const { reset, resetUser } = authSlice.actions
export default authSlice.reducer

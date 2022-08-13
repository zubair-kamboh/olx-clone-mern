import { configureStore } from '@reduxjs/toolkit'
import authReducer from './redux/auth/authSlice'
import adsReducer from './redux/ads/adsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ads: adsReducer,
  },
})

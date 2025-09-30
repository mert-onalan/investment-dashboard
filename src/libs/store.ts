import { configureStore } from '@reduxjs/toolkit'
import investmentDasboardSlice from './slices/widget-status-slice'

export const makeStore = () => {
  return configureStore({
    reducer: investmentDasboardSlice
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
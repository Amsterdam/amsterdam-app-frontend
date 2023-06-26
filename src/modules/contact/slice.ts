import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ReduxKey, RootState} from '@/store/types'

export type ContactState = {
  selectedCityOfficeId?: string
}

export const contactSlice = createSlice({
  name: ReduxKey.contact,
  initialState: {} as ContactState,
  reducers: {
    setSelectedCityOffice: (state, {payload}: PayloadAction<string>) => {
      state.selectedCityOfficeId = payload
    },
  },
})

export const {setSelectedCityOffice} = contactSlice.actions

export const selectCityOffice = (state: RootState) =>
  state[ReduxKey.contact].selectedCityOfficeId

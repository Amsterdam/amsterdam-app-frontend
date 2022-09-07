import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '@/store'

type ContactState = {
  selectedCityOfficeId?: string
}

export const contactSlice = createSlice({
  name: 'contact',
  initialState: {} as ContactState,
  reducers: {
    setSelectedCityOffice: (state, {payload}: PayloadAction<string>) => {
      state.selectedCityOfficeId = payload
    },
  },
})

export const {setSelectedCityOffice} = contactSlice.actions

export const selectCityOffice = (state: RootState) =>
  state.contact.selectedCityOfficeId

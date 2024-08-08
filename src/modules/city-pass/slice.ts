import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'

export type CityPassState = {
  /**
   * Whether the user is been logged in and registered in the city-pass backend.
   */
  isCityPassOwnerRegistered: boolean
  /**
   * Whether the city-passes overlay UI is visible.
   */
  isCityPassesVisible: boolean
}

const initialState: CityPassState = {
  isCityPassesVisible: false,
  isCityPassOwnerRegistered: false,
}

export const cityPassSlice = createSlice({
  name: ReduxKey.cityPass,
  initialState,
  reducers: {
    hideCityPasses: state => {
      state.isCityPassesVisible = false
    },
    setIsCityPassOwnerRegistered: (
      state,
      {payload}: PayloadAction<boolean>,
    ) => {
      state.isCityPassOwnerRegistered = payload
    },
    showCityPasses: state => {
      state.isCityPassesVisible = true
    },
  },
})

export const {hideCityPasses, setIsCityPassOwnerRegistered, showCityPasses} =
  cityPassSlice.actions

export const selectIsCityPassesVisible = (state: RootState) =>
  state[ReduxKey.cityPass].isCityPassesVisible

export const selectIsCityPassOwnerRegistered = (state: RootState) =>
  state[ReduxKey.cityPass].isCityPassOwnerRegistered

export const useSetCityPassOwnerIsRegistered = () => {
  const dispatch = useDispatch()

  return useCallback(
    (value: boolean) => dispatch(setIsCityPassOwnerRegistered(value)),
    [dispatch],
  )
}

import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useSelector} from '@/hooks/redux/useSelector'
import {Onboarding} from '@/modules/onboarding/types'
import {ReduxKey} from '@/store/types/reduxKey'
import {type RootState} from '@/store/types/rootState'

export type OnboardingState = Onboarding

const initialState: OnboardingState = {
  hasSeenOnboarding: false,
}

export const onboardingSlice = createSlice({
  name: ReduxKey.onboarding,
  initialState,
  reducers: {
    setHasSeenOnboarding: (
      state,
      {payload: hasSeen}: PayloadAction<boolean>,
    ) => {
      state.hasSeenOnboarding = hasSeen
    },
  },
})

export const {setHasSeenOnboarding} = onboardingSlice.actions

const selectHasSeenOnboarding = (state: RootState) =>
  state[ReduxKey.onboarding].hasSeenOnboarding

export const useHasSeenOnboarding = () => useSelector(selectHasSeenOnboarding)

import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Tip} from '@/components/features/onboarding/types'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'

export type OnboardingState = {
  seenTips: Tip[]
}

const initialState: OnboardingState = {seenTips: []}

export const onboardingSlice = createSlice({
  name: ReduxKey.onboarding,
  initialState,
  reducers: {
    resetSeenTips: () => initialState,
    addSeenTip: (state, {payload}: PayloadAction<Tip>) => {
      const {seenTips} = state

      !seenTips.includes(payload) && seenTips.push(payload)
    },
  },
})

export const {addSeenTip, resetSeenTips} = onboardingSlice.actions

export const selectSeenTips = (state: RootState) =>
  state[ReduxKey.onboarding].seenTips

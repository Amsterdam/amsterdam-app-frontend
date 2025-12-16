import {AnyAction, Dispatch, ThunkDispatch} from '@reduxjs/toolkit'

// eslint-disable-next-line @typescript-eslint/no-explicit-any, sonarjs/no-useless-intersection
export type ReduxDispatch = ThunkDispatch<any, undefined, AnyAction> &
  // eslint-disable-next-line sonarjs/no-useless-intersection
  Dispatch<AnyAction>

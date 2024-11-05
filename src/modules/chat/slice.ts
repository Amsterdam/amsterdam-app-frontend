import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {ChatVisibility} from '@/modules/chat/types'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'

export type ChatState = {
  isOpen: boolean
  minimizedHeight: number
  visibility: ChatVisibility
}

const initialState: ChatState = {
  isOpen: false,
  minimizedHeight: 0,
  visibility: ChatVisibility.maximized,
}

export const chatSlice = createSlice({
  name: ReduxKey.chat,
  initialState,
  reducers: {
    closeChat: state => ({
      ...state,
      isOpen: false,
    }),
    maximizeChat: state => ({
      ...state,
      visibility: ChatVisibility.maximized,
    }),
    minimizeChat: state => ({
      ...state,
      visibility: ChatVisibility.minimized,
    }),
    setHeightMinimized: (state, {payload: height}: PayloadAction<number>) => ({
      ...state,
      minimizedHeight: height,
    }),
    openChat: state => ({
      ...state,
      isOpen: true,
      visibility: ChatVisibility.maximized,
    }),
    clearChatMessages: state => ({
      ...state,
      messages: [],
    }),
    toggleChatIsOpen: state => ({
      ...state,
      isOpen: !state.isOpen,
    }),
    toggleChatVisibility: state => ({
      ...state,
      visibility:
        state.visibility === ChatVisibility.maximized
          ? ChatVisibility.minimized
          : ChatVisibility.maximized,
    }),
  },
})

const {
  closeChat,
  openChat,
  maximizeChat,
  minimizeChat,
  setHeightMinimized,
  toggleChatIsOpen,
  toggleChatVisibility,
} = chatSlice.actions

const selectChatIsOpen = (state: RootState) => state[ReduxKey.chat].isOpen
const selectChatVisibility = (state: RootState) =>
  state[ReduxKey.chat].visibility

const selectChatMinimizedHeight = (state: RootState) =>
  state[ReduxKey.chat].minimizedHeight

export const useChat = () => {
  const isOpen = useSelector(selectChatIsOpen)
  const visibility = useSelector(selectChatVisibility)
  const isMaximized = visibility === ChatVisibility.maximized
  const isMinimized = visibility === ChatVisibility.minimized
  const minimizedHeight = useSelector(selectChatMinimizedHeight)
  const dispatch = useDispatch()

  const open = useCallback(() => dispatch(openChat()), [dispatch])
  const close = useCallback(() => dispatch(closeChat()), [dispatch])
  const maximize = useCallback(() => dispatch(maximizeChat()), [dispatch])
  const minimize = useCallback(() => dispatch(minimizeChat()), [dispatch])
  const setMinimizedHeight = useCallback(
    (height: number) => dispatch(setHeightMinimized(height)),
    [dispatch],
  )
  const toggleIsOpen = useCallback(
    () => dispatch(toggleChatIsOpen()),
    [dispatch],
  )
  const toggleVisibility = useCallback(
    () => dispatch(toggleChatVisibility()),
    [dispatch],
  )

  return {
    close,
    isMaximized,
    isMinimized,
    isOpen,
    open,
    maximize,
    minimize,
    minimizedHeight,
    setMinimizedHeight,
    toggleIsOpen,
    toggleVisibility,
    visibility,
  }
}

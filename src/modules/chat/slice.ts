import {createSlice} from '@reduxjs/toolkit'
import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'

export enum ChatVisibility {
  maximized = 'maximized',
  minimized = 'minimized',
}

export type ChatState = {
  isOpen?: boolean
  visibility?: ChatVisibility
}

const initialState: ChatState = {
  isOpen: false,
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
    openChat: state => ({
      ...state,
      isOpen: true,
      visibility: ChatVisibility.maximized,
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
  toggleChatIsOpen,
  toggleChatVisibility,
} = chatSlice.actions

const selectChatIsOpen = (state: RootState) => state[ReduxKey.chat].isOpen
const selectChatVisibility = (state: RootState) =>
  state[ReduxKey.chat].visibility

export const useChat = () => {
  const isOpen = useSelector(selectChatIsOpen)
  const visibility = useSelector(selectChatVisibility)
  const dispatch = useDispatch()

  const open = useCallback(() => dispatch(openChat()), [dispatch])
  const close = useCallback(() => dispatch(closeChat()), [dispatch])
  const maximize = useCallback(() => dispatch(maximizeChat()), [dispatch])
  const minimize = useCallback(() => dispatch(minimizeChat()), [dispatch])
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
    isOpen,
    open,
    maximize,
    minimize,
    toggleIsOpen,
    toggleVisibility,
    visibility,
  }
}

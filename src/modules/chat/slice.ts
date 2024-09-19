import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {
  ChatMessage,
  ChatVisibility,
  ChatMessageBase,
} from '@/modules/chat/types'
import {ReduxKey} from '@/store/types/reduxKey'
import {RootState} from '@/store/types/rootState'

export type ChatState = {
  isOpen: boolean
  messages: ChatMessage[]
  visibility: ChatVisibility
}

const initialState: ChatState = {
  isOpen: false,
  messages: [],
  visibility: ChatVisibility.maximized,
}

export const chatSlice = createSlice({
  name: ReduxKey.chat,
  initialState,
  reducers: {
    addChatMessage: (state, {payload}: PayloadAction<ChatMessageBase>) => ({
      ...state,
      messages: [...state.messages, {...payload, timestamp: Date.now()}],
    }),
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
  addChatMessage,
  clearChatMessages,
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
const selectChatMessages = (state: RootState) => state[ReduxKey.chat].messages

export const useChat = () => {
  const isOpen = useSelector(selectChatIsOpen)
  const visibility = useSelector(selectChatVisibility)
  const messages = useSelector(selectChatMessages)
  const dispatch = useDispatch()

  const addMessage = useCallback(
    (message: ChatMessageBase) => dispatch(addChatMessage(message)),
    [dispatch],
  )
  const clearMessages = useCallback(
    () => dispatch(clearChatMessages()),
    [dispatch],
  )
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
    addMessage,
    clearMessages,
    close,
    isOpen,
    open,
    maximize,
    messages,
    minimize,
    toggleIsOpen,
    toggleVisibility,
    visibility,
  }
}

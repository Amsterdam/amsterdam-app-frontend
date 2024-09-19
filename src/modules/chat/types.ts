export enum ChatVisibility {
  maximized = 'maximized',
  minimized = 'minimized',
}

export enum ChatMessageAgent {
  bot = 'bot',
  employee = 'employee',
  user = 'user',
}

export type ChatMessageBase = {
  agent: ChatMessageAgent
  text: string
}

export type ChatMessage = ChatMessageBase & {
  timestamp: number
}

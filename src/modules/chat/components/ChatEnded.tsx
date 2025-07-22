import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {useChatContext} from '@/modules/chat/providers/chat.context'
import {useChat} from '@/modules/chat/slice'
import {downloadChat} from '@/modules/chat/utils/downloadChat'

export const ChatEnded = () => {
  const {close} = useChat()
  const {addDownloadedTranscriptId} = useChatContext()

  return (
    <Box>
      <Column gutter="smd">
        <Button
          label="Chat downloaden"
          onPress={() => {
            void downloadChat().then(
              entryId => entryId && addDownloadedTranscriptId(entryId),
            )
          }}
          testID="ChatEndedDownloadButton"
          variant="secondary"
        />
        <Button
          label="Chat sluiten"
          onPress={close}
          testID="ChatEndedCloseButton"
        />
      </Column>
    </Box>
  )
}

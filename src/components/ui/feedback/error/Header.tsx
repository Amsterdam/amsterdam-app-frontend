import {Box} from '@/components/ui/containers/Box'
import {SharedProps} from '@/components/ui/feedback/error/types'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {getErrorCode} from '@/utils/getErrorCode'

export const FullScreenErrorHeader = ({
  error,
  isPortrait,
  testID,
  text,
  title,
  TopComponent,
}: SharedProps) => (
  <Box
    grow={!isPortrait}
    variant={isPortrait ? 'default' : 'distinct'}>
    {!!TopComponent && TopComponent}
    <Column
      align="center"
      grow={1}
      gutter="md">
      <Title
        level="h3"
        testID={`${testID}Title`}
        text={title}
        textAlign="center"
      />
      {(!!error || !!text) && (
        <Column>
          {!!text && (
            <Paragraph
              testID={`${testID}Paragraph`}
              textAlign="center">
              {text}
            </Paragraph>
          )}
          {!!error && (
            <Paragraph
              testID={`${testID}ErrorText`}
              textAlign="center">
              {`Foutcode is ${getErrorCode(error)}`}
            </Paragraph>
          )}
        </Column>
      )}
    </Column>
  </Box>
)

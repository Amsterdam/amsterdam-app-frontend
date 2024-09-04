import {SharedProps} from '@/components/features/screen/error/types'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {getErrorCode} from '@/utils/getErrorCode'

export const Header = ({
  error,
  isPortrait,
  testID,
  text,
  title,
  TopComponent,
}: SharedProps) => (
  <Box
    distinct={!isPortrait}
    grow={!isPortrait}
    insetHorizontal="md"
    insetVertical="lg">
    <Column
      align="center"
      grow={1}
      gutter="md"
      halign="center">
      {!!TopComponent && TopComponent}
      <Title
        level="h3"
        testID={testID + 'Title'}
        text={title}
        textAlign="center"
      />
      {(!!error || !!text) && (
        <Column>
          {!!text && (
            <Paragraph
              testID={testID + 'Paragraph'}
              textAlign="center">
              {text ?? ''}
            </Paragraph>
          )}
          {!!error && (
            <Paragraph
              testID={testID + 'Error'}
              textAlign="center">
              {`Foutcode is ${getErrorCode(error)}`}
            </Paragraph>
          )}
        </Column>
      )}
    </Column>
  </Box>
)

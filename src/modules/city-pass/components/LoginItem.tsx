import {View} from 'react-native'
import {Column} from '@/components/ui/layout/Column'
import {ProgressStep} from '@/components/ui/progressSteps/ProgressStep'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'

type Props = {
  isCurrent: boolean
  isDone: boolean
  isLast?: boolean
  isNextDone?: boolean
  numberIndicator: number
  text: string
  title: string
}

export const LoginItem = ({
  isCurrent,
  isDone,
  isLast = false,
  isNextDone = false,
  numberIndicator,
  text,
  title,
}: Props) => (
  <View
    accessibilityLabel={`Stap ${numberIndicator},`.concat(
      isDone ? 'afgerond' : `${title}, ${text}`,
    )}
    accessible>
    <ProgressStep
      numberIndicator={numberIndicator}
      progressStatus={isDone ? 'done' : isCurrent ? 'active' : 'planned'}
      progressStatusNextItem={
        isLast ? undefined : isNextDone ? 'done' : 'planned'
      }
      testID="CityPassLoginProgressStep"
      variant="secondary">
      <Column shrink={1}>
        <Title
          color={!isDone && !isCurrent ? 'secondary' : 'default'}
          level="h4"
          text={title}
        />
        <Paragraph color={!isDone && !isCurrent ? 'secondary' : 'default'}>
          {text}
        </Paragraph>
      </Column>
    </ProgressStep>
  </View>
)

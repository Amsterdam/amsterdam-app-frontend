import {View} from 'react-native'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {AlertBaseProps} from '@/components/ui/feedback/alert/AlertBase'
import {AlertNegative} from '@/components/ui/feedback/alert/AlertNegative'
import {useAccessibilityAnnounceEffect} from '@/hooks/accessibility/useAccessibilityAnnounce'

type SomethingWentWrongProps = Omit<AlertBaseProps, 'text'> & {
  retryFn?: () => void
  text?: string
}

type WrapperProps = Pick<SomethingWentWrongProps, 'retryFn' | 'testID'> & {
  children: React.ReactNode
}

const Wrapper = ({children, retryFn, testID}: WrapperProps) =>
  retryFn ? (
    <Pressable
      onPress={retryFn}
      testID={testID}>
      {children}
    </Pressable>
  ) : (
    <View testID={testID}>{children}</View>
  )

export const SomethingWentWrong = ({
  retryFn,
  testID,
  text = 'Er ging iets mis.',
  title = 'Sorry …',
  ...alertProps
}: SomethingWentWrongProps) => {
  useAccessibilityAnnounceEffect(`${title} ${text}`)

  return (
    <Wrapper
      retryFn={retryFn}
      testID={testID}>
      <AlertNegative
        {...alertProps}
        testID="SomethingWentWrong"
        text={text}
        title={title}
      />
    </Wrapper>
  )
}

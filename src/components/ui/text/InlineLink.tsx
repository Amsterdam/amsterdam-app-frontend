import {FC, Fragment, ReactNode} from 'react'
import {Pressable, TextProps, View} from 'react-native'
import {Phrase, PhraseProps} from '@/components/ui/text/Phrase'
import {TestProps} from '@/components/ui/types'
import {useIsScreenReaderEnabled} from '@/hooks/useIsScreenReaderEnabled'

type Props = {
  children: ReactNode
  onPress: () => void
  phraseVariant?: PhraseProps['variant']
} & TestProps &
  Omit<TextProps, 'style'>

export const InlineLink = ({
  children,
  onPress,
  phraseVariant,
  ...otherProps
}: Props) => {
  const isScreenReaderEnabled = useIsScreenReaderEnabled()

  const WrapperComponent: FC<{children: ReactNode}> = isScreenReaderEnabled
    ? props => (
        <View>
          <Pressable
            onPress={onPress}
            {...props}
          />
        </View>
      )
    : Fragment

  return (
    <WrapperComponent>
      <Phrase
        accessibilityRole="link"
        color="link"
        underline
        variant={phraseVariant}
        {...otherProps}>
        {children}
      </Phrase>
    </WrapperComponent>
  )
}

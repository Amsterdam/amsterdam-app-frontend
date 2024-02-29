import {ReactNode} from 'react'
import {View, StyleSheet} from 'react-native'
import {config} from '@/components/ui/config'
import {Phrase} from '@/components/ui/text/Phrase'
import {type TestProps} from '@/components/ui/types'

type Props = {
  children: ReactNode
} & TestProps

/**
 * A faux button is not an actual button, but a helper component for a specific design pattern: when label and a button are horizontally aligned, this component can be used to align the baseline of the label text with the baseline of the button text.
 */
export const FauxButton = ({children, testID}: Props) => (
  <View style={styles.button}>
    <Phrase testID={testID}>{children}</Phrase>
  </View>
)

const styles = StyleSheet.create({
  button: {
    minHeight: config.buttonHeight,
    flexDirection: 'column',
    justifyContent: 'center',
  },
})

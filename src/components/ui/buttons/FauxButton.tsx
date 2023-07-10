import {ReactNode} from 'react'
import {View, StyleSheet} from 'react-native'
import {Phrase} from '@/components/ui/text'
import {heightTokens} from '@/themes/tokens/height'

type Props = {
  children: ReactNode
}

export const FauxButton = ({children}: Props) => (
  <View style={styles.button}>
    <Phrase>{children}</Phrase>
  </View>
)

const styles = StyleSheet.create({
  button: {
    minHeight: heightTokens.button.default,
    flexDirection: 'column',
    justifyContent: 'center',
  },
})

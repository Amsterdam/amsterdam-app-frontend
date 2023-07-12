import {ReactNode} from 'react'
import {View, StyleSheet} from 'react-native'
import {config} from '@/components/ui/config'
import {Phrase} from '@/components/ui/text'

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
    minHeight: config.buttonHeight,
    flexDirection: 'column',
    justifyContent: 'center',
  },
})

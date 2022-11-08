import React from 'react'
import {StyleSheet, View} from 'react-native'
import RNRestart from 'react-native-restart'
import {Button} from '@/components/ui/buttons'
import {Box} from '@/components/ui/containers/Box'
import {Warning} from '@/components/ui/feedback'
import {Column} from '@/components/ui/layout'
import {Screen} from '@/components/ui/layout/Screen'
import {Theme, useThemable} from '@/themes'

export const ErrorWithRestart = () => {
  const styles = useThemable(createStyles)

  return (
    <View style={styles.screen}>
      <Screen scroll={false} withTopInset>
        <Box inset="lg">
          <Column gutter="md">
            <Warning title="Sorry …" text="Er is iets misgegaan met de app." />
            <Button
              label="Herstart de app"
              onPress={() => RNRestart.Restart()}
            />
          </Column>
        </Box>
      </Screen>
    </View>
  )
}

const createStyles = ({color}: Theme) =>
  StyleSheet.create({
    screen: {
      backgroundColor: color.screen.background.default,
      flex: 1,
    },
  })

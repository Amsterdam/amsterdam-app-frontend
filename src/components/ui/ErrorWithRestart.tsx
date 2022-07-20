import React from 'react'
import {StyleSheet, View} from 'react-native'
import RNRestart from 'react-native-restart'
import {Attention} from './Attention'
import {Box} from './Box'
import {Column} from './layout'
import {Screen} from './layout/Screen'
import {Paragraph} from './text'
import {Button} from '@/components/ui/buttons'
import {Theme, useThemable} from '@/themes'

export const ErrorWithRestart = () => {
  const styles = useThemable(createStyles)

  return (
    <View style={styles.screen}>
      <Screen withTopInset>
        <Box inset="lg">
          <Column gutter="md">
            <Attention warning>
              <Paragraph>
                Er is iets misgegaan met de app. Sorry voor het ongemak!
              </Paragraph>
            </Attention>
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

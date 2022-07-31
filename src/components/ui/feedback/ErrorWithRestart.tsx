import React from 'react'
import {StyleSheet, View} from 'react-native'
import RNRestart from 'react-native-restart'
import {Box} from '@/components/ui/Box'
import {Button} from '@/components/ui/buttons'
import {Attention} from '@/components/ui/feedback'
import {Column} from '@/components/ui/layout'
import {Screen} from '@/components/ui/layout/Screen'
import {Paragraph} from '@/components/ui/text'
import {Theme, useThemable} from '@/themes'

export const ErrorWithRestart = () => {
  const styles = useThemable(createStyles)

  return (
    <View style={styles.screen}>
      <Screen scroll={false} withTopInset>
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

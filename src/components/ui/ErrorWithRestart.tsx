import React from 'react'
import RNRestart from 'react-native-restart'
import {Attention} from './Attention'
import {Box} from './Box'
import {Button} from './Button'
import {Grid, GridCell} from './layout'
import {Screen} from './layout/Screen'
import {Paragraph} from './typography'

export const ErrorWithRestart = () => (
  <Screen withoutNavigationHeader>
    <Box>
      <Grid>
        <GridCell>
          <Attention warning>
            <Paragraph>
              Er is iets misgegaan met de app. Sorry voor het ongemak!
            </Paragraph>
          </Attention>
        </GridCell>
        <GridCell>
          <Button
            onPress={() => RNRestart.Restart()}
            text="De app opnieuw opstarten"
          />
        </GridCell>
      </Grid>
    </Box>
  </Screen>
)

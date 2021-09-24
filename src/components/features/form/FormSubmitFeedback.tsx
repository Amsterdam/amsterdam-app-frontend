import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Checkmark, Close} from '../../../assets/icons'
import {size} from '../../../tokens'
import {Button, Card, CardBody, Gutter, Text, Title} from '../../ui'

type Result = 'success' | 'failure'

type ResultConfig = {
  [K in Result]: {
    body: string
    button: React.ReactElement
    icon: React.ReactElement
    title: string
  }
}

type Props = {
  result: Result
}

const resultConfig: ResultConfig = {
  failure: {
    body: 'Het is niet gelukt om de pushnotificatie te versturen',
    button: <Button onPress={() => {}} text="Probeer het nog eens" />,
    icon: <Close />,
    title: 'Helaas…',
  },
  success: {
    body: 'De pushnotificatie is verstuurd.',
    button: <Button onPress={() => {}} text="Naar projectpagina" />,
    icon: <Checkmark />,
    title: 'Gelukt!',
  },
}

export const FormSubmitFeedback = ({result}: Props) => {
  return (
    <Card>
      <CardBody>
        {resultConfig[result].icon}
        <Gutter height={size.spacing.lg} />
        <Title text={resultConfig[result].title} />
        <Gutter height={size.spacing.sm} />
        <Text>{resultConfig[result].body}</Text>
        <Gutter height={size.spacing.md} />
        <View style={styles.button}>{resultConfig[result].button}</View>
      </CardBody>
    </Card>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'flex-start',
  },
})

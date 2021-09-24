import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Checkmark, Close} from '../../../assets/icons'
import {size} from '../../../tokens'
import {Button, Card, CardBody, Gutter, Text, Title} from '../../ui'

type Status = 'success' | 'failure'

type StatusCollection = {
  [K in Status]: {
    body: string
    button: React.ReactElement
    icon: React.ReactElement
    title: string
  }
}

type Props = {
  status: Status
}

const statusCollection: StatusCollection = {
  failure: {
    body: 'Het is niet gelukt om de pushnotificatie te versturen',
    button: <Button onPress={() => {}} text="Ga naar de hel" />,
    icon: <Close />,
    title: 'Helaas...',
  },
  success: {
    body: 'De pushnotificatie is verstuurd.',
    button: <Button onPress={() => {}} text="Naar projectpagina" />,
    icon: <Checkmark />,
    title: 'Gelukt!',
  },
}

export const FormSubmitFeedback = ({status}: Props) => {
  return (
    <Card>
      <CardBody>
        {statusCollection[status].icon}
        <Gutter height={size.spacing.lg} />
        <Title text={statusCollection[status].title} />
        <Gutter height={size.spacing.sm} />
        <Text>{statusCollection[status].body}</Text>
        <Gutter height={size.spacing.md} />
        <View style={styles.button}>{statusCollection[status].button}</View>
      </CardBody>
    </Card>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'flex-start',
  },
})

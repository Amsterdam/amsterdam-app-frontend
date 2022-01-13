import React from 'react'
import {StyleSheet, View} from 'react-native'
import {color} from '../../tokens'
import {Text, Title} from '.'

type Props = {
  variant: 'success' | 'failure'
}

export const Alert = ({variant}: Props) => {
  const styles = StyleSheet.create({
    bar: {
      backgroundColor:
        variant === 'success' ? color.status.success : color.status.error,
    },
  })

  return (
    <View style={styles.bar}>
      <Title text="Gelukt" />
      <Text>Het adres is verwijderd uit uw profiel</Text>
    </View>
  )
}

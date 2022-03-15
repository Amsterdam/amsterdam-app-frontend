import Enlarge from '@amsterdam/asc-assets/static/icons/Enlarge.svg'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import {color} from '../../../tokens'
import {Button} from '../../ui'

export const ImagePicker = () => {
  return (
    <View style={styles.container}>
      <Button
        icon={<Enlarge style={styles.icon} />}
        text="Foto's toevoegen"
        variant="inverse"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
  },
  icon: {
    width: 24,
    height: 24,
    fill: color.font.primary,
  },
})

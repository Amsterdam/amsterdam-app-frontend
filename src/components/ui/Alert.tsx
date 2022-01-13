import React, {useContext} from 'react'
import {StyleSheet, View} from 'react-native'
import {AlertContext} from '../../providers'
import {color} from '../../tokens'
import {Text, Title} from '.'

export const Alert = () => {
  const {content, variant} = useContext(AlertContext)
  const styles = StyleSheet.create({
    bar: {
      backgroundColor:
        variant === 'success' ? color.status.success : color.status.error,
    },
  })

  return (
    <>
      {content?.title && content.text && (
        <View style={styles.bar}>
          <Title text={content.title} />
          <Text>{content.text}</Text>
        </View>
      )}
    </>
  )
}

import React from 'react'
import {StyleSheet, View} from 'react-native'
import {size} from '../../../tokens'
import {Box, Text, TextButton} from '../../ui'

export const AuthorizedProjects = () => (
  <Box background="grey">
    <Text small>Uw bouwprojecten</Text>
    <View style={styles.container}>
      <Text>Authorized projects go here</Text>
    </View>
    <Text small>Ontbreekt er een bouwproject?</Text>
    <TextButton emphasis text="Neem contact op met de redactie" />
  </Box>
)

const styles = StyleSheet.create({
  container: {
    marginHorizontal: -size.spacing.md,
    marginVertical: size.spacing.md,
  },
})

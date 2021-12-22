import React from 'react'
import {StyleSheet, View} from 'react-native'
import {color, size} from '../../../tokens'
import {Box} from '../../ui'
import {Column, Gutter} from '../../ui/layout'
import {Chapter, chapters, HeroImage, Intro, Outro} from './index'

export const BestWishes21Article = () => (
  <View style={styles.background}>
    <HeroImage />
    <View style={styles.container}>
      <Box>
        <Column gutter="xl">
          <Intro />
          {chapters.map(chapter => (
            <Chapter key={chapter.title} {...chapter} />
          ))}
          <Outro />
        </Column>
      </Box>
    </View>
    <Gutter height={size.spacing.xl} />
  </View>
)

const styles = StyleSheet.create({
  background: {
    backgroundColor: color.background.white,
  },
  container: {
    maxWidth: 480,
    alignSelf: 'center',
  },
})

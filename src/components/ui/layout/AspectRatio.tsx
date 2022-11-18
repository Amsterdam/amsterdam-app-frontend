import React, {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {Orientation} from '@/components/ui/types'
import {Theme, useThemable} from '@/themes'
import {ImageAspectRatioTokens} from '@/themes/tokens'

type Props = {
  aspectRatio: keyof ImageAspectRatioTokens
  children: ReactNode
  orientation?: keyof typeof Orientation
}

export const AspectRatio = ({
  aspectRatio,
  children,
  orientation = 'landscape',
}: Props) => {
  const styles = useThemable(createStyles(aspectRatio, orientation))

  return <View style={styles.view}>{children}</View>
}

const createStyles =
  (aspectRatio: Props['aspectRatio'], orientation: Props['orientation']) =>
  ({media}: Theme) => {
    const aspectRatioValue =
      orientation === Orientation.portrait
        ? 1 / media.aspectRatio[aspectRatio]
        : media.aspectRatio[aspectRatio]

    return StyleSheet.create({
      view: {
        aspectRatio: aspectRatioValue,
      },
    })
  }

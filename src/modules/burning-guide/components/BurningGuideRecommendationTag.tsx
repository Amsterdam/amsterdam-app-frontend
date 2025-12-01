import {StyleSheet, View} from 'react-native'
import type {Theme} from '@/themes/themes'
import {Box} from '@/components/ui/containers/Box'
import {Size} from '@/components/ui/layout/Size'
import {Phrase} from '@/components/ui/text/Phrase'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {BurningGuideCodeVariant} from '@/modules/burning-guide/types'
import {useThemable} from '@/themes/useThemable'

type FontSize = Extract<keyof Theme['text']['fontSize'], 'body' | 'small'>

export const BurningGuideRecommendationTag = ({
  variant,
  fontSize = 'body',
}: {
  fontSize?: FontSize
  variant: BurningGuideCodeVariant
}) => {
  const {fontScale} = useDeviceContext()
  const styles = useThemable(createStyles)

  return (
    <Size width={130 * fontScale}>
      <View style={styles[variant]}>
        <Box
          insetHorizontal="md"
          insetVertical="sm">
          <Phrase
            color={
              variant === BurningGuideCodeVariant.red ? 'inverse' : 'default'
            }
            emphasis="strong"
            textAlign="center"
            variant={fontSize}>
            Code {variant}
          </Phrase>
        </Box>
      </View>
    </Size>
  )
}

const createStyles = ({color}: Theme) =>
  StyleSheet.create({
    [BurningGuideCodeVariant.red]: {
      backgroundColor: color.burningGuide.red,
    },
    [BurningGuideCodeVariant.orange]: {
      backgroundColor: color.burningGuide.orange,
    },
    [BurningGuideCodeVariant.yellow]: {
      backgroundColor: color.burningGuide.yellow,
    },
  })

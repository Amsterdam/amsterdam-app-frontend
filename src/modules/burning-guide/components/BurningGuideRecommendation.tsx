import {StyleSheet, View} from 'react-native'
import type {Theme} from '@/themes/themes'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {BurningGuideRecommendationTag} from '@/modules/burning-guide/components/BurningGuideRecommendationTag'
import {BurningGuideRouteName} from '@/modules/burning-guide/routes'
import {BurningGuideCodeVariant} from '@/modules/burning-guide/types'
import {useThemable} from '@/themes/useThemable'

const TITLE_VARIANT_MAP: Record<BurningGuideCodeVariant, string> = {
  [BurningGuideCodeVariant.red]: 'Stook geen hout',
  [BurningGuideCodeVariant.orange]: 'Liever geen hout stoken',
  [BurningGuideCodeVariant.yellow]: 'Hout stoken kan, maar doe het slim',
}

export const BurningGuideRecommendation = ({
  variant,
}: {
  variant: BurningGuideCodeVariant
}) => {
  const styles = useThemable(createStyles)
  const {navigate} = useNavigation()

  return (
    <View style={[styles.container, styles[variant]]}>
      <Box inset="lg">
        <Column
          gutter="md"
          halign="center">
          <Title
            testID="BurningGuideRecommendationTitle"
            text={TITLE_VARIANT_MAP[variant]}
            textAlign="center"
          />
          <BurningGuideRecommendationTag
            fontSize="body"
            variant={variant}
          />
          <NavigationButton
            horizontallyAlign="center"
            iconSize="md"
            insetVertical="sm"
            onPress={() => {
              navigate(BurningGuideRouteName.burningGuide)
            }}
            testID="BurningGuideRecommendationNavigationButton"
            title="Meer informatie"
          />
        </Column>
      </Box>
    </View>
  )
}

const createStyles = ({color, size}: Theme) =>
  StyleSheet.create({
    container: {
      borderWidth: size.spacing.xs,
    },
    [BurningGuideCodeVariant.red]: {
      borderColor: color.burningGuide.red,
    },
    [BurningGuideCodeVariant.orange]: {
      borderColor: color.burningGuide.orange,
    },
    [BurningGuideCodeVariant.yellow]: {
      borderColor: color.burningGuide.yellow,
    },
  })

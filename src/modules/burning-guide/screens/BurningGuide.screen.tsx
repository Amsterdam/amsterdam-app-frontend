import {FeatureFlag} from '@/components/features/FeatureFlag'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Features} from '@/constants/featureFlags'
import {useSelectedPostalArea} from '@/modules/address/hooks/useSelectedPostalArea'
import {BurningGuide} from '@/modules/burning-guide/components/BurningGuide'
import {BurningGuideAddress} from '@/modules/burning-guide/components/BurningGuideAddress'
import {BurningGuideInfoButtons} from '@/modules/burning-guide/components/BurningGuideInfoButtons'
import {BurningGuideNotificationToggleBox} from '@/modules/burning-guide/components/BurningGuideNotificationToggleBox'

export const BurningGuideScreen = () => {
  const postalArea = useSelectedPostalArea()

  return (
    <Screen testID="BurningGuideScreen">
      <Column
        grow={1}
        gutter="xl">
        <Box
          insetBottom="no"
          insetHorizontal="md"
          insetTop="md">
          <Column gutter="xl">
            <BurningGuideAddress />
            {!!postalArea && <BurningGuide postalArea={postalArea} />}
          </Column>
        </Box>
      </Column>
      <FeatureFlag feature={Features.BurningGuideNotifications}>
        <BurningGuideNotificationToggleBox />
      </FeatureFlag>
      <BurningGuideInfoButtons />
    </Screen>
  )
}

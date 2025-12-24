import {FeatureFlag} from '@/components/features/FeatureFlag'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Features} from '@/constants/featureFlags'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {BurningGuide} from '@/modules/burning-guide/components/BurningGuide'
import {BurningGuideAddress} from '@/modules/burning-guide/components/BurningGuideAddress'
import {BurningGuideInfoButtons} from '@/modules/burning-guide/components/BurningGuideInfoButtons'
import {BurningGuideNotificationToggleBox} from '@/modules/burning-guide/components/BurningGuideNotificationToggleBox'

export const BurningGuideScreen = () => {
  const {address} = useSelectedAddress()

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
            <BurningGuideAddress address={address} />
            {!!address && <BurningGuide zipCode={address.postcode} />}
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

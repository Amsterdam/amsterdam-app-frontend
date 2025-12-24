import {FeatureFlag} from '@/components/features/FeatureFlag'
import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {Screen} from '@/components/features/screen/Screen'
import {Column} from '@/components/ui/layout/Column'
import {Features} from '@/constants/featureFlags'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {bottomsheetVariants as wasteContainerBottomsheetVariants} from '@/modules/waste-container/components/bottomsheet/bottomsheetVariants'
import {WasteGuide} from '@/modules/waste-guide/components/WasteGuide'
import {WasteGuideInformation} from '@/modules/waste-guide/components/WasteGuideInformation'
import {WasteGuideMoreOptions} from '@/modules/waste-guide/components/WasteGuideMoreOptions'
import {WasteGuideNotificationToggleBox} from '@/modules/waste-guide/components/WasteGuideNotificationToggleBox'
import {WasteGuideShare} from '@/modules/waste-guide/components/WasteGuideShare'

export const WasteGuideScreen = () => {
  const {isPortrait} = useDeviceContext()

  return (
    <Screen
      bottomSheet={
        <BottomSheet
          testID="SelectLocationTypeBottomSheet"
          variants={wasteContainerBottomsheetVariants}
        />
      }
      headerOptions={{SideComponent: WasteGuideShare}}
      testID="WasteGuideScreen"
      withLeftInset={isPortrait}
      withRightInset={isPortrait}>
      <Column gutter="xl">
        <WasteGuide />
        <FeatureFlag feature={Features.WasteGuideNotifications}>
          <WasteGuideNotificationToggleBox />
        </FeatureFlag>
        <WasteGuideMoreOptions />
        <WasteGuideInformation />
      </Column>
    </Screen>
  )
}

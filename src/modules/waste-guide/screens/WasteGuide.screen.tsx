import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {Screen} from '@/components/features/screen/Screen'
import {Column} from '@/components/ui/layout/Column'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {WasteGuide} from '@/modules/waste-guide/components/WasteGuide'
import {WasteGuideInformation} from '@/modules/waste-guide/components/WasteGuideInformation'
import {WasteGuideMoreOptions} from '@/modules/waste-guide/components/WasteGuideMoreOptions'
import {WasteGuideShare} from '@/modules/waste-guide/components/WasteGuideShare'
import {bottomsheetVariants} from '@/modules/waste-guide/components/bottomsheet/bottomsheetVariants'

export const WasteGuideScreen = () => {
  const {isPortrait} = useDeviceContext()

  return (
    <Screen
      bottomSheet={
        <BottomSheet
          testID="SelectLocationTypeBottomSheet"
          variants={bottomsheetVariants}
        />
      }
      headerOptions={{SideComponent: WasteGuideShare}}
      testID="WasteGuideScreen"
      withLeftInset={isPortrait}
      withRightInset={isPortrait}>
      <Column gutter="xl">
        <WasteGuide />
        <WasteGuideMoreOptions />
        <WasteGuideInformation />
      </Column>
    </Screen>
  )
}

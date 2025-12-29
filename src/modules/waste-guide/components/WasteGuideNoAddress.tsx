import {Box} from '@/components/ui/containers/Box'
import {HorizontalSafeArea} from '@/components/ui/containers/HorizontalSafeArea'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Column} from '@/components/ui/layout/Column'
import {WasteGuideAddressSwitch} from '@/modules/waste-guide/components/WasteGuideAddressSwitch'

type Props = {
  isFetchingWasteGuide: boolean
}

export const WasteGuideNoAddress = ({isFetchingWasteGuide}: Props) => (
  <Column
    grow={1}
    gutter="xl">
    <HorizontalSafeArea flex={1}>
      <Box grow>
        <Column
          flex={1}
          gutter="lg">
          <Column gutter="md">
            <WasteGuideAddressSwitch />
          </Column>
          {!!isFetchingWasteGuide && (
            <PleaseWait testID="WasteGuideLoadingSpinner" />
          )}
        </Column>
      </Box>
    </HorizontalSafeArea>
  </Column>
)

import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {WasteCardBluetoothSvg} from '@/modules/waste-container/assets/images/WasteCardBluetoothSvg'

export const WasteCardDirections = () => (
  <Column
    gutter="lg"
    halign="center">
    <WasteCardBluetoothSvg />
    <Paragraph
      accessibilityLabel="Houd uw telefoon voor de sensor rechts van de opening van de container."
      testID="WasteCardScreenBluetoothText"
      textAlign="center">
      Houd uw telefoon voor de sensor in het gele vlak op de container.
    </Paragraph>
  </Column>
)

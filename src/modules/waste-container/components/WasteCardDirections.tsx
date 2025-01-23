import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {WasteCardBluetoothSvg} from '@/modules/waste-container/assets/images/WasteCardBluetoothSvg'

export const WasteCardDirections = () => (
  <Column
    gutter="sm"
    halign="center">
    <WasteCardBluetoothSvg />
    <Paragraph testID="WasteCardScreenBluetoothText">
      Houd uw telefoon voor de sensor in het gele vlak op de container.
    </Paragraph>
  </Column>
)

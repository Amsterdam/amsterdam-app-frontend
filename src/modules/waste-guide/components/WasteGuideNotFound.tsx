import {Button} from '@/components/ui/buttons/Button'
import {EmptyMessage} from '@/components/ui/feedback/EmptyMessage'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useSelectedAddressForWasteGuide} from '@/modules/waste-guide/hooks/useSelectedAddressForWasteGuide'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'
import {getNotFoundText} from '@/modules/waste-guide/utils/getNotFoundText'

export const WasteGuideNotFound = () => {
  const navigation = useNavigation<WasteGuideRouteName>()
  const {address, locationType} = useSelectedAddressForWasteGuide()

  return (
    <Column gutter="lg">
      <EmptyMessage
        testID="WasteGuideNotFoundMessage"
        text={getNotFoundText(address, locationType)}
      />
      <Row align="start">
        <Button
          label="Dit klopt niet"
          onPress={() =>
            navigation.navigate(WasteGuideRouteName.wasteGuideFeedback)
          }
          testID="WasteGuideNotFoundMistakeButton"
        />
      </Row>
    </Column>
  )
}

import {Button} from '@/components/ui/buttons/Button'
import {EmptyMessage} from '@/components/ui/feedback/EmptyMessage'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useModuleBasedSelectedAddress} from '@/modules/address/hooks/useModuleBasedSelectedAddress'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'
import {getNotFoundText} from '@/modules/waste-guide/utils/getNotFoundText'
import {ReduxKey} from '@/store/types/reduxKey'

export const WasteGuideNotFound = () => {
  const navigation = useNavigation<WasteGuideRouteName>()
  const {address, locationType} = useModuleBasedSelectedAddress(
    ReduxKey.wasteGuide,
  )

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

import {Button} from '@/components/ui/buttons/Button'
import {EmptyMessage} from '@/components/ui/feedback/EmptyMessage'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'

export const WasteGuideNotFound = () => {
  const navigation = useNavigation<WasteGuideRouteName>()

  return (
    <Column gutter="lg">
      <EmptyMessage text="We hebben geen afvalinformatie gevonden voor dit adres." />
      <Row align="start">
        <Button
          label="Dit klopt niet"
          onPress={() =>
            navigation.navigate(WasteGuideRouteName.wasteGuideFeedback)
          }
        />
      </Row>
    </Column>
  )
}

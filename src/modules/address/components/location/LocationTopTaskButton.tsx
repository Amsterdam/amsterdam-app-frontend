import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {TestProps} from '@/components/ui/types'

type Props = {
  hasTitleIcon?: boolean
  onPress: () => void
} & TestProps

// TODO: implement (87654)
export const LocationTopTaskButton = ({
  hasTitleIcon,
  onPress,
  testID,
}: Props) => (
  <TopTaskButton
    iconName="location"
    onPress={onPress}
    testID={testID}
    text="Geef uw locatie door"
    title="Mijn locatie"
    titleIconName={hasTitleIcon ? 'chevron-down' : undefined}
  />
)

import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {type TestProps} from '@/components/ui/types'
import {type LogProps} from '@/processes/piwik/types'

type Props = {
  hasTitleIcon?: boolean
  onPress: () => void
} & TestProps &
  LogProps

export const RequestTopTaskButton = ({
  hasTitleIcon,
  onPress,
  testID,
  ...props
}: Props) => (
  <TopTaskButton
    iconName="location"
    onPress={onPress}
    testID={testID}
    title="Geef uw locatie door"
    titleIconName={hasTitleIcon ? 'chevron-down' : undefined}
    {...props}
  />
)

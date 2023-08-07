import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'

type Props = {
  hasTitleIcon?: boolean
  onPress: () => void
}

// TODO: implement (87654)
export const LocationTopTaskButton = ({hasTitleIcon, onPress}: Props) => (
  <TopTaskButton
    iconName="location"
    onPress={onPress}
    text="Geef uw locatie door"
    title="Mijn locatie"
    titleIconName={hasTitleIcon ? 'chevron-down' : undefined}
  />
)

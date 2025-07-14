import {IconButton} from '@/components/ui/buttons/IconButton'
import {MeatballsMenuIcon} from '@/components/ui/media/icons/MeatballsMenuIcon'
import {TestProps} from '@/components/ui/types'
import {useMenu} from '@/store/slices/menu'
import {useTheme} from '@/themes/useTheme'

type Props = TestProps

export const MenuHeaderButton = ({testID}: Props) => {
  const {color} = useTheme()

  const {isOpen, toggle} = useMenu()

  return (
    <IconButton
      accessibilityLabel={`Menu ${isOpen ? 'sluiten' : 'openen'}.`}
      icon={
        <MeatballsMenuIcon color={color.pressable.secondary.default.icon} />
      }
      onPress={toggle}
      testID={testID}
    />
  )
}

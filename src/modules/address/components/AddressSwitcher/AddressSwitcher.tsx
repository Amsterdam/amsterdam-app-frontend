import type {TestProps} from '@/components/ui/types'
import {type TopTaskButtonProps} from '@/components/ui/buttons/TopTaskButton'
import {AddressSwitcherBase} from '@/modules/address/components/AddressSwitcher/AddressSwitcherBase'
import {useAddressSwitch} from '@/modules/address/components/AddressSwitcher/useAddressSwitch'

export type AddressSwitcherProps = TestProps &
  Omit<
    TopTaskButtonProps,
    | 'iconName'
    | 'iconSize'
    | 'iconRightSize'
    | 'insetVertical'
    | 'insets'
    | 'border'
    | 'iconRightName'
    | 'isExternalLink'
    | 'isInternalLink'
    | 'text'
    | 'textAdditional'
    | 'titleIconName'
    | 'title'
    | 'variant'
  >

export const AddressSwitcher = (props: AddressSwitcherProps) => {
  const {iconName, title} = useAddressSwitch()

  return (
    <AddressSwitcherBase
      iconName={iconName}
      title={title}
      {...props}
    />
  )
}

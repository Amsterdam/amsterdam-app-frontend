import type {SvgIconName} from '@/components/ui/media/svgIcons'
import {
  TopTaskButton,
  type TopTaskButtonProps,
} from '@/components/ui/buttons/TopTaskButton'
import {type TestProps} from '@/components/ui/types'

export type AddressSwitcherProps = {
  iconName: Extract<
    SvgIconName,
    'location' | 'housing' | 'spinner' | 'mapLocationIosFilled'
  >
  title: string
} & TestProps &
  Omit<
    TopTaskButtonProps,
    | 'iconName'
    | 'title'
    | 'iconSize'
    | 'iconRightSize'
    | 'insetVertical'
    | 'border'
    | 'iconRightName'
  >

export const AddressSwitcherBase = ({
  title,
  iconName,
  ...props
}: AddressSwitcherProps) => (
  <TopTaskButton
    border
    iconName={iconName}
    iconRightName={'chevron-right'}
    iconRightSize="md"
    iconSize="lg"
    insetVertical="no"
    title={title}
    {...props}
  />
)

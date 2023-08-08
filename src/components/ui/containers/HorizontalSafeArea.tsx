import {
  SafeArea,
  SharedSafeAreaProps,
} from '@/components/ui/containers/SafeArea'

type Props = {
  apply?: boolean
} & SharedSafeAreaProps

export const HorizontalSafeArea = ({apply = true, ...rest}: Props) => (
  <SafeArea
    left={apply}
    right={apply}
    {...rest}
  />
)

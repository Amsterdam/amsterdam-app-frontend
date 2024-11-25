import {Skeleton} from '@/components/ui/feedback/Skeleton'
import {ShowCityPassButton} from '@/modules/city-pass/components/ShowCityPassButton'

type Props = {
  isLoading: boolean
}

export const ShowCityPassButtonSkeleton = ({isLoading}: Props) => (
  <Skeleton isLoading={isLoading}>
    <ShowCityPassButton />
  </Skeleton>
)

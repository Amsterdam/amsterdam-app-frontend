import {Skeleton} from '@/components/ui/feedback/Skeleton'
import {CityPassCard} from '@/modules/city-pass/components/card-display/CityPassCard'

const cityPassMock = {
  actief: true,
  firstname: 'John',
  infix: 'van',
  lastname: 'Doe',
  passNumberComplete: '123456789',
  dateEndFormatted: '01-01-2022',
}

type Props = {
  isLoading: boolean
}

export const CityPassCardSkeleton = ({isLoading}: Props) => (
  <Skeleton isLoading={isLoading}>
    <CityPassCard
      cityPass={cityPassMock}
      testID="CityPassCardSkeletonMockCard"
    />
  </Skeleton>
)

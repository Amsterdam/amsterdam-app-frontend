import {ChangeLocationButton} from '@/modules/address/components/location/ChangeLocationButton'
import {Address} from '@/modules/address/types'
import {getAddressParam} from '@/modules/address/utils/getAddressParam'
import {Projects} from '@/modules/construction-work/components/projects/Projects'

type Props = {
  address: Address
}

export const ProjectsByDistance = ({address}: Props) => {
  const addressParam = getAddressParam(address)

  return (
    <Projects
      addressParam={addressParam}
      HeaderButton={<ChangeLocationButton testID="ConstructionWork" />}
    />
  )
}

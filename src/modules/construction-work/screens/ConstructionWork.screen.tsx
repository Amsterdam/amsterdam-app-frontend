import {useSelector} from 'react-redux'
import {Screen} from '@/components/ui/layout'
import {selectAddress} from '@/modules/address/slice'
import {
  ProjectsByDate,
  ProjectsByDistance,
} from '@/modules/construction-work/components/projects'

export const ConstructionWorkScreen = () => {
  const address = useSelector(selectAddress)

  return (
    <Screen
      scroll={false}
      withBottomInset={false}>
      {address?.shortAddress ? (
        <ProjectsByDistance address={address} />
      ) : (
        <ProjectsByDate />
      )}
    </Screen>
  )
}

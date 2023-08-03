import {useSelector} from 'react-redux'
import {Screen} from '@/components/ui/layout/Screen'
import {selectAddress} from '@/modules/address/slice'
import {ProjectsByDate} from '@/modules/construction-work/components/projects/ProjectsByDate'
import {ProjectsByDistance} from '@/modules/construction-work/components/projects/ProjectsByDistance'

export const ConstructionWorkScreen = () => {
  const address = useSelector(selectAddress)

  return (
    <Screen
      scroll={false}
      withBottomInset={false}>
      {address ? <ProjectsByDistance address={address} /> : <ProjectsByDate />}
    </Screen>
  )
}

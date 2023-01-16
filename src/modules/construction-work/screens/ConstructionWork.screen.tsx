import React from 'react'
import {useSelector} from 'react-redux'
import {Screen} from '@/components/ui/layout'
import {selectAddress} from '@/modules/address/slice'
import {
  ProjectsByDate,
  ProjectsByDistance,
} from '@/modules/construction-work/components/projects'

export const ConstructionWorkScreen = () => {
  const address = useSelector(selectAddress)
  const hasAddress = !!address.adres

  return (
    <Screen scroll={false} withBottomInset={false}>
      {hasAddress ? (
        <ProjectsByDistance address={address} />
      ) : (
        <ProjectsByDate />
      )}
    </Screen>
  )
}

import React, {useContext} from 'react'
import {SettingsContext} from '../../../providers'
import {ClosableCard, Text} from '../../ui'

export const DisplaySettings = () => {
  const {settings} = useContext(SettingsContext)

  return (
    <ClosableCard title="Instellingen">
      <Text>{JSON.stringify(settings, null, 2)}</Text>
    </ClosableCard>
  )
}

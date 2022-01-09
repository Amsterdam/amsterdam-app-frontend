import React, {useContext} from 'react'
import {DeviceContext} from '../../../providers'
import {ClosableCard, Text} from '../../ui'
import {Row} from '../../ui/layout'

export const DeviceSettings = () => {
  const device = useContext(DeviceContext)
  const deviceObj = JSON.parse(JSON.stringify(device))

  return (
    <ClosableCard title="Apparaat">
      <>
        {Object.keys(deviceObj)
          .sort()
          .map(key => (
            <Row gutter="sm" key={key}>
              <Text secondary>{key}</Text>
              <Text>{deviceObj[key].toString()}</Text>
            </Row>
          ))}
      </>
    </ClosableCard>
  )
}

import React, {useContext} from 'react'
import {DeviceContext} from '../../../providers'
import {ClosableCard, Text} from '../../ui'
import {Row} from '../../ui/layout'

export const DeviceSettings = () => {
  const deviceContext = useContext(DeviceContext)
  const deviceContextValues = JSON.parse(JSON.stringify(deviceContext))

  return (
    <ClosableCard title="Apparaat">
      <>
        {Object.keys(deviceContextValues)
          .sort()
          .map(key => (
            <Row gutter="sm" key={key}>
              <Text secondary>{key}</Text>
              <Text>{deviceContextValues[key].toString()}</Text>
            </Row>
          ))}
      </>
    </ClosableCard>
  )
}

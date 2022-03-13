import React, {useEffect, useState} from 'react'
import {WebView} from '../../components/ui'
import {getEnvironment} from '../../environment'
import {useAsyncStorage} from '../../hooks'
import {Address} from '../../types'

export const ReportIssueScreen = () => {
  const asyncStorage = useAsyncStorage()
  const [address, setAddress] = useState<Address | undefined>()

  useEffect(() => {
    asyncStorage
      .getValue<Address>('address')
      .then(storedAddress => setAddress(storedAddress))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WebView
      url={`${getEnvironment().signalsBaseUrl}/incident/beschrijf`}
      urlParams={{
        lat: address?.centroid[1],
        lng: address?.centroid[0],
      }}
    />
  )
}

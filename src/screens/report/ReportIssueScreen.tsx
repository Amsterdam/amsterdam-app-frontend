import React from 'react'
import {useSelector} from 'react-redux'
import {selectAddress} from '../../components/features/address/addressSlice'
import {WebView} from '../../components/ui'
import {getEnvironment} from '../../environment'

export const ReportIssueScreen = () => {
  const {primary: address} = useSelector(selectAddress)

  return (
    <WebView
      url={`${getEnvironment().signalsBaseUrl}/incident/beschrijf`}
      urlParams={{
        lat: address?.centroid[1] ?? 0,
        lng: address?.centroid[0] ?? 0,
      }}
    />
  )
}

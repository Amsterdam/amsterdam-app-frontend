import React from 'react'
import {useSelector} from 'react-redux'
import {WebView} from '../../components/ui'
import {getEnvironment} from '../../environment'
import {selectAddress} from '../address/addressSlice'

export const ReportProblemScreen = () => {
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

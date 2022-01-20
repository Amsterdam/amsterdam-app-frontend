import React, {useContext} from 'react'
import {WebView} from '../../components/ui'
import {getEnvironment} from '../../environment'
import {SettingsContext} from '../../providers'

export const ReportIssueScreen = () => {
  const {settings} = useContext(SettingsContext)
  const {address} = {...settings}

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

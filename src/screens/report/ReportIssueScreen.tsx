import React, {useContext} from 'react'
import {WebView} from '../../components/ui'
import {getEnvironment} from '../../environment'
import {AddressContext} from '../../providers'

export const ReportIssueScreen = () => {
  const addressContext = useContext(AddressContext)

  return (
    <WebView
      url={`${getEnvironment().signalsBaseUrl}/incident/beschrijf`}
      urlParams={{
        lat: addressContext.address?.centroid[1],
        lng: addressContext.address?.centroid[0],
      }}
    />
  )
}

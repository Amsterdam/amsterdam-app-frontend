import React from 'react'
import {useSelector} from 'react-redux'
import {WebView} from '../../../components/ui'
import {getEnvironment} from '../../../environment'
import {selectAddress} from '../../address/addressSlice'

export const ReportNotCollectedScreen = () => {
  const {primary: address} = useSelector(selectAddress)
  return (
    <WebView
      url={`${getEnvironment().signalsBaseUrl}/categorie/afval/grofvuil`}
      urlParams={{
        lat: address?.centroid[1] ?? 0,
        lng: address?.centroid[0] ?? 0,
      }}
    />
  )
}

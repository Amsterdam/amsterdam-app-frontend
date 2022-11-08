import React from 'react'
import {WebView} from '@/components/ui/containers'
import {Screen} from '@/components/ui/layout'
import {useEnvironment} from '@/store'

export const ReportProblemScreen = () => {
  const environment = useEnvironment()

  return (
    <Screen scroll={false}>
      <WebView url={`${environment.signalsBaseUrl}/incident/beschrijf`} />
    </Screen>
  )
}

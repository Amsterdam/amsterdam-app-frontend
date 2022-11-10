import React from 'react'
import {Screen} from '@/components/ui/layout'
import {EnvironmentSelector} from '@/modules/home/components'
import {isDevApp} from '@/processes'

export const AdminScreen = () => (
  <Screen keyboardAware>{!!isDevApp && <EnvironmentSelector />}</Screen>
)

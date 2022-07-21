import React from 'react'
import {EnvironmentSelector} from '@/components/features'
import {Screen} from '@/components/ui/layout'
import {isDevApp} from '@/processes'

export const AdminScreen = () => (
  <Screen keyboardAware>{!!isDevApp && <EnvironmentSelector />}</Screen>
)

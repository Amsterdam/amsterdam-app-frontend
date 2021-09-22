import React from 'react'
import {Text} from '../../ui'

export const ValidationWarning = ({warning}: {warning: string}) => {
  return (
    <Text accessibilityRole="alert" warning>
      {warning}
    </Text>
  )
}

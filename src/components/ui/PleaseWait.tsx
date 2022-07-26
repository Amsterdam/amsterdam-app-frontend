import React from 'react'
import {Spinner} from '@/components/ui'
import {Center} from '@/components/ui/layout'
import {layoutStyles} from '@/styles'

type Props = {
  grow?: boolean
}

export const PleaseWait = ({grow}: Props) => (
  <Center style={grow && layoutStyles.grow}>
    <Spinner />
  </Center>
)

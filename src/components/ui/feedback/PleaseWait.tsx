import {Spinner} from '_components/ui'
import {Center} from '_components/ui/layout'
import React from 'react'
import {layoutStyles} from '@/styles'

type Props = {
  grow?: boolean
}

export const PleaseWait = ({grow}: Props) => (
  <Center style={grow && layoutStyles.grow}>
    <Spinner />
  </Center>
)

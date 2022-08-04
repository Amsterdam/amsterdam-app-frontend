import React from 'react'
import {Spinner} from '@/components/ui'
import {Center} from '@/components/ui/layout'

type Props = {
  grow?: boolean
}

export const PleaseWait = ({grow}: Props) => (
  <Center grow={grow}>
    <Spinner />
  </Center>
)

import React from 'react'
import {Spinner} from '@/components/ui/feedback'
import {Center} from '@/components/ui/layout'

type Props = {
  grow?: boolean
}

export const PleaseWait = ({grow}: Props) => (
  <Center grow={grow}>
    <Spinner />
  </Center>
)

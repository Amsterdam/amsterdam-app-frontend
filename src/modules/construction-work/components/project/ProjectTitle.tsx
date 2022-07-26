import React from 'react'
import {Text} from '@/components/ui'

type Props = {
  title: string
  subtitle?: string
}

export const ProjectTitle = ({title, subtitle}: Props) => (
  <>
    <Text large>{title}</Text>
    {!!subtitle && (
      <Text secondary small>
        {subtitle}
      </Text>
    )}
  </>
)

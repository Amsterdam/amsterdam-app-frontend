import React from 'react'
import {Row} from '@/components/ui/layout'
import {HeaderLogo} from '@/modules/home/components/HeaderLogo'
import {HeaderNavigation} from '@/modules/home/components/HeaderNavigation'

export const HeaderContentForHome = () => (
  <Row gutter="md" align="between">
    <HeaderLogo />
    <HeaderNavigation />
  </Row>
)

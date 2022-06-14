import {Row} from '_components/ui/layout'
import {HeaderLogo} from '_modules/home/components/HeaderLogo'
import {HeaderNavigation} from '_modules/home/components/HeaderNavigation'
import React from 'react'

export const HeaderContentForHome = () => (
  <Row gutter="md" align="between">
    <HeaderLogo />
    <HeaderNavigation />
  </Row>
)

import {Row} from '@/components/ui/layout/Row'
import {HeaderLogo} from '@/modules/home/components/HeaderLogo'
import {HeaderNavigation} from '@/modules/home/components/HeaderNavigation'

export const HeaderContentForHome = () => (
  <Row
    align="between"
    gutter="md"
    valign="center">
    <HeaderLogo />
    <HeaderNavigation />
  </Row>
)

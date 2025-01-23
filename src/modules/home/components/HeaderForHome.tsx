import {HeaderBase} from '@/components/features/header/HeaderBase'
import {Row} from '@/components/ui/layout/Row'
import {AmsterdamLogoSvg} from '@/modules/home/components/AmsterdamLogoSvg'
import {HeaderNavigation} from '@/modules/home/components/HeaderNavigation'

export const HeaderForHome = () => (
  <HeaderBase>
    <Row
      align="between"
      gutter="md"
      valign="center">
      <AmsterdamLogoSvg
        accessibilityLabel="Gemeente Amsterdam"
        accessibilityRole="header"
        accessible
      />
      <HeaderNavigation />
    </Row>
  </HeaderBase>
)

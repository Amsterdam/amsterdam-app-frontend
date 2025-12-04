import {Column} from '@/components/ui/layout/Column'
import {BurningGuideReportButton} from '@/modules/burning-guide/components/BurningGuideReportButton'
import {BurningGuideRisksButton} from '@/modules/burning-guide/components/BurningGuideRisksButton'
import {BurningGuideTipsButton} from '@/modules/burning-guide/components/BurningGuideTipsButton'

export const BurningGuideInfoButtons = () => (
  <Column gutter="md">
    <BurningGuideTipsButton />
    <BurningGuideRisksButton />
    <BurningGuideReportButton />
  </Column>
)

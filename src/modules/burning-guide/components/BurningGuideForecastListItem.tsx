import type {ListItem} from '@/modules/burning-guide/types'
import {Row} from '@/components/ui/layout/Row'
import {Size} from '@/components/ui/layout/Size'
import {Phrase} from '@/components/ui/text/Phrase'
import {BurningGuideRecommendationTag} from '@/modules/burning-guide/components/BurningGuideRecommendationTag'

type ListItemProps = Omit<ListItem, 'id'>

export const BurningGuideForecastListItem = ({
  variant,
  isFixed = false,
  timeWindow,
}: ListItemProps) => (
  <Row align="between">
    <Phrase>{timeWindow}</Phrase>
    <Row>
      <BurningGuideRecommendationTag
        fontSize="small"
        variant={variant}
      />
      <Size width={20}>
        {!isFixed && <Phrase textAlign="center">*</Phrase>}
      </Size>
    </Row>
  </Row>
)

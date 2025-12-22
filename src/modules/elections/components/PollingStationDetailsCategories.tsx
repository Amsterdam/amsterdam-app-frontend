import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {PollingStationSvgIcons} from '@/modules/elections/constants'
import {ElectionsCategory} from '@/modules/elections/types'

type Props = {
  categories: ElectionsCategory[]
}

const mapCategoryToLabel: Record<ElectionsCategory, string> = {
  [ElectionsCategory.disabledParking]: 'Parkeerplaats voor gehandicapten',
  [ElectionsCategory.hearingImpaired]: 'Hulp voor slechthorenden/doven',
  [ElectionsCategory.ptWheelchair]:
    'Rolstoeltoegankelijke OV-halte binnen 100m',
  [ElectionsCategory.pysicalLimitation]: 'Toegankelijk met rolstoel',
  [ElectionsCategory.readingAid]: 'Hulp met lezen',
  [ElectionsCategory.visionImpaired]: 'Hulpmiddelen voor slechtzienden/blinden',
  [ElectionsCategory.wheelchairHelp]: 'Hulp bij rolstoel',
}

const mapCategoryToIconName: Record<
  ElectionsCategory,
  keyof typeof PollingStationSvgIcons
> = {
  [ElectionsCategory.disabledParking]: 'disabledParking',
  [ElectionsCategory.hearingImpaired]: 'hearingImpaired',
  [ElectionsCategory.ptWheelchair]: 'wheelchairPublicTransport',
  [ElectionsCategory.pysicalLimitation]: 'wheelchair',
  [ElectionsCategory.readingAid]: 'readingAid',
  [ElectionsCategory.visionImpaired]: 'visionImpaired',
  [ElectionsCategory.wheelchairHelp]: 'wheelchairPlus',
}

export const PollingStationDetailsCategories = ({categories}: Props) => (
  <Column gutter="md">
    <Title
      level="h5"
      text="Toegankelijkheid"
    />
    {categories?.map(
      category =>
        !!mapCategoryToIconName[category] &&
        !!mapCategoryToLabel[category] && (
          <Row
            gutter="md"
            key={category}>
            <Icon
              name={mapCategoryToIconName[category]}
              size="xl"
            />
            <Paragraph>{mapCategoryToLabel[category]}</Paragraph>
          </Row>
        ),
    )}
  </Column>
)

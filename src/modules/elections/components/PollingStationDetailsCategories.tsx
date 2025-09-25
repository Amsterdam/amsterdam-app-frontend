import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {SvgIconName} from '@/components/ui/media/svgIcons'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {ElectionsCategory} from '@/modules/elections/types'

type Props = {
  categories: ElectionsCategory[]
}

const mapCategoryToLabel: Record<ElectionsCategory, string> = {
  [ElectionsCategory.ptWheelchair]: 'Rolstoeltoegankelijk',
  [ElectionsCategory.disabledParking]: 'Gehandicaptenparkeerplaats binnen 100m',
  [ElectionsCategory.visionImpaired]:
    'Voorzieningen voor blinden/slechtzienden',
  [ElectionsCategory.pysicalLimitation]: 'Fysieke beperking',
}

const mapCategoryToIconName: Record<ElectionsCategory, SvgIconName> = {
  [ElectionsCategory.ptWheelchair]: 'wheelchair',
  [ElectionsCategory.disabledParking]: 'disabledParking',
  [ElectionsCategory.visionImpaired]: 'visionImpaired',
  [ElectionsCategory.pysicalLimitation]: 'wheelchair',
}

export const PollingStationDetailsCategories = ({categories}: Props) =>
  categories?.length ? (
    <Column gutter="md">
      <Title
        level="h5"
        text="Toegankelijkheid"
      />
      {categories?.map(category => (
        <Row
          gutter="md"
          key={category}>
          <Icon
            name={mapCategoryToIconName[category]}
            size="xl"
          />
          <Paragraph>{mapCategoryToLabel[category]}</Paragraph>
        </Row>
      ))}
    </Column>
  ) : null

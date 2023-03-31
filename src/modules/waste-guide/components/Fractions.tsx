import {Column, Row} from '@/components/ui/layout'
import {Phrase} from '@/components/ui/text'
import {WasteFractionIcon} from '@/modules/waste-guide/components'
import {
  FractionCode,
  WasteGuideResponseFraction,
} from '@/modules/waste-guide/types'

type FractionSectionProps = {
  content: string
  label: string
}

const FractionSection = ({content, label}: FractionSectionProps) => (
  <Phrase>
    <Phrase emphasis="strong">{label}: </Phrase>
    {content}
  </Phrase>
)

type FractionProps = {
  fraction: WasteGuideResponseFraction
}

const Fraction = ({fraction}: FractionProps) => (
  <Column gutter="md">
    <Row gutter="sm">
      <WasteFractionIcon name={fraction.afvalwijzerFractieCode} />
      <Phrase emphasis="strong">{fraction.afvalwijzerFractieNaam}</Phrase>
    </Row>
    <Column gutter="sm">
      {!!fraction.afvalwijzerInstructie2 && (
        <FractionSection
          content={fraction.afvalwijzerInstructie2}
          label="Hoe"
        />
      )}
      {!!fraction.afvalwijzerOphaaldagen && (
        <FractionSection
          content={fraction.afvalwijzerOphaaldagen}
          label="Ophaaldag"
        />
      )}
      {!!(
        fraction.afvalwijzerBuitenzettenVanaf &&
        fraction.afvalwijzerBuitenzettenTot
      ) && (
        <FractionSection
          content={`${fraction.afvalwijzerBuitenzettenVanaf} ${fraction.afvalwijzerBuitenzettenTot}`}
          label="Buitenzetten"
        />
      )}
      {!!fraction.afvalwijzerWaar && (
        <FractionSection content={fraction.afvalwijzerWaar} label="Waar" />
      )}
    </Column>
  </Column>
)

type Props = {
  wasteGuide: WasteGuideResponseFraction[]
}

export const Fractions = ({wasteGuide}: Props) => (
  <Column gutter="xl">
    {wasteGuide
      .filter(w => w.afvalwijzerFractieCode !== FractionCode.Plastic)
      .map(fraction => (
        <Fraction fraction={fraction} key={fraction.afvalwijzerFractieCode} />
      ))}
  </Column>
)

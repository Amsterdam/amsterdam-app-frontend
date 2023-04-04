import {Attention} from '@/components/ui/feedback'
import {Column, Row} from '@/components/ui/layout'
import {Phrase} from '@/components/ui/text'
import {
  FractionContent,
  FractionSection,
  WasteFractionIcon,
} from '@/modules/waste-guide/components'
import {WasteGuideResponseFraction} from '@/modules/waste-guide/types'
import {dayjs} from '@/utils'

type Props = {
  fraction: WasteGuideResponseFraction
}

/**
 * Show the notification if we have content a start date and an end date and the current date is between (or equal to) the start and end date.
 */
const showTimeBoundNotification = ({
  afvalwijzerAfvalkalenderMelding,
  afvalwijzerAfvalkalenderTot,
  afvalwijzerAfvalkalenderVan,
}: WasteGuideResponseFraction) => {
  if (
    !afvalwijzerAfvalkalenderMelding ||
    !afvalwijzerAfvalkalenderVan ||
    !afvalwijzerAfvalkalenderTot
  ) {
    return false
  }

  return (
    dayjs().isBefore(dayjs(afvalwijzerAfvalkalenderTot)) &&
    dayjs().isAfter(dayjs(afvalwijzerAfvalkalenderVan))
  )
}

/**
 * Get content for the "buitenzetten" section, if any
 */
const getBuitenzettenContent = ({
  afvalwijzerBuitenzettenTot,
  afvalwijzerBuitenzettenVanaf,
}: WasteGuideResponseFraction) => {
  if (!afvalwijzerBuitenzettenVanaf || !afvalwijzerBuitenzettenTot) {
    return undefined
  }

  return `${afvalwijzerBuitenzettenVanaf} ${afvalwijzerBuitenzettenTot}`
}

export const Fraction = ({fraction}: Props) => {
  const {
    afvalwijzerAfvalkalenderMelding,
    afvalwijzerAfvalkalenderOpmerking,
    afvalwijzerFractieCode,
    afvalwijzerFractieNaam,
    afvalwijzerInstructie2,
    afvalwijzerOphaaldagen,
    afvalwijzerWaar,
  } = fraction

  return (
    <Column gutter="lg">
      <Row gutter="sm">
        <WasteFractionIcon fractionCode={afvalwijzerFractieCode} />
        <Phrase emphasis="strong">{afvalwijzerFractieNaam}</Phrase>
      </Row>
      {showTimeBoundNotification(fraction) && (
        <Attention>
          <FractionContent content={afvalwijzerAfvalkalenderMelding} />
        </Attention>
      )}
      <Column gutter="md">
        <FractionSection content={afvalwijzerInstructie2} label="Hoe" />
        <FractionSection content={afvalwijzerOphaaldagen} label="Ophaaldag" />
        <FractionSection
          content={getBuitenzettenContent(fraction)}
          label="Buitenzetten"
        />
        <FractionSection content={afvalwijzerWaar} label="Waar" />
      </Column>
      {!!afvalwijzerAfvalkalenderOpmerking && (
        <Attention>
          <FractionContent content={afvalwijzerAfvalkalenderOpmerking} />
        </Attention>
      )}
    </Column>
  )
}

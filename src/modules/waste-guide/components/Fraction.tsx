import {useMemo} from 'react'
import {useSelector} from 'react-redux'
import {Attention} from '@/components/ui/feedback'
import {Column, Row} from '@/components/ui/layout'
import {Title} from '@/components/ui/text'
import {selectAddress} from '@/modules/address/slice'
import {
  FractionContent,
  FractionSection,
  WasteFractionIcon,
} from '@/modules/waste-guide/components'
import {
  WasteGuideResponseFraction,
  WasteGuideUrl,
} from '@/modules/waste-guide/types'
import {getContainerMapUrl} from '@/modules/waste-guide/utils'
import {capitalizeString, dayjs} from '@/utils'

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
  const address = useSelector(selectAddress)
  const {
    afvalwijzerAfvalkalenderMelding,
    afvalwijzerAfvalkalenderOpmerking,
    afvalwijzerButtontekst,
    afvalwijzerFractieCode,
    afvalwijzerFractieNaam,
    afvalwijzerInstructie2,
    afvalwijzerOphaaldagen2,
    afvalwijzerUrl,
    afvalwijzerWaar,
  } = fraction

  // Remove once the API includes the url as a single property
  const containerMapUrl = useMemo(() => {
    if (afvalwijzerUrl && afvalwijzerUrl === WasteGuideUrl.wasteContainersUrl) {
      return getContainerMapUrl(address.coordinates, afvalwijzerFractieCode)
    }
  }, [address.coordinates, afvalwijzerFractieCode, afvalwijzerUrl])

  return (
    <Column gutter="md">
      <Row gutter="sm" valign="center">
        <WasteFractionIcon fractionCode={afvalwijzerFractieCode} />
        <Title level="h4" text={afvalwijzerFractieNaam} />
      </Row>
      {showTimeBoundNotification(fraction) && (
        <Attention>
          <FractionContent content={afvalwijzerAfvalkalenderMelding} />
        </Attention>
      )}
      <Column gutter="md">
        <FractionSection
          buttonContent={afvalwijzerButtontekst ?? undefined}
          buttonLink={afvalwijzerButtontekst ? afvalwijzerUrl : undefined}
          content={afvalwijzerInstructie2}
          label="Hoe"
        />
        <FractionSection
          content={capitalizeString(afvalwijzerOphaaldagen2 ?? '')}
          label="Ophaaldag"
        />
        <FractionSection
          content={getBuitenzettenContent(fraction)}
          label="Buitenzetten"
        />
        <FractionSection
          content={afvalwijzerWaar}
          inlineLink={containerMapUrl}
          label="Waar"
        />
      </Column>
      {!!afvalwijzerAfvalkalenderOpmerking && (
        <Attention>
          <FractionContent content={afvalwijzerAfvalkalenderOpmerking} />
        </Attention>
      )}
    </Column>
  )
}

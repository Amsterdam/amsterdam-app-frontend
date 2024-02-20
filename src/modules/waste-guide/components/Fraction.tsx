import {Attention} from '@/components/ui/feedback/Attention'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {InlineLink} from '@/components/ui/text/InlineLink'
import {Title} from '@/components/ui/text/Title'
import {TestProps} from '@/components/ui/types'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {FractionButtonSection} from '@/modules/waste-guide/components/FractionButtonSection'
import {FractionContent} from '@/modules/waste-guide/components/FractionContent'
import {FractionSection} from '@/modules/waste-guide/components/FractionSection'
import {TimeboundNotification} from '@/modules/waste-guide/components/TimeboundNotification'
import {WasteFractionIcon} from '@/modules/waste-guide/components/WasteFractionIcon'
import {useWasteGuideUrls} from '@/modules/waste-guide/hooks/useWasteGuideUrls'
import {WasteGuideResponseFraction} from '@/modules/waste-guide/types'
import {accessibleText} from '@/utils/accessibility/accessibleText'
import {capitalizeString} from '@/utils/capitalizeString'
import {dayjs} from '@/utils/datetime/dayjs'
import {formatEnumeration} from '@/utils/formatEnumeration'

type Props = {
  fraction: WasteGuideResponseFraction
} & TestProps

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

export const Fraction = ({fraction, testID}: Props) => {
  const openWebUrl = useOpenWebUrl()
  const {
    bulkyWasteAppointmentUrl,
    collectionPointsMapUrl,
    containerMapUrl,
    seenonsUrl,
  } = useWasteGuideUrls(fraction)

  const {
    afvalwijzerAfvalkalenderFrequentie,
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

  const buttonUrl = bulkyWasteAppointmentUrl ?? seenonsUrl ?? afvalwijzerUrl

  return (
    <Column gutter="md">
      <Row
        gutter="sm"
        valign="center">
        <WasteFractionIcon
          fractionCode={afvalwijzerFractieCode}
          testID={`${testID}Icon`}
        />
        <Title
          accessibilityLabel={accessibleText(afvalwijzerFractieNaam)}
          level="h4"
          text={afvalwijzerFractieNaam}
        />
      </Row>
      {showTimeBoundNotification(fraction) && (
        <TimeboundNotification>
          <FractionContent
            content={afvalwijzerAfvalkalenderMelding}
            testID={`${testID}Content`}
          />
        </TimeboundNotification>
      )}
      <Column gutter="md">
        <Column gutter="sm">
          {afvalwijzerButtontekst && buttonUrl ? (
            <FractionButtonSection
              buttonLabel={afvalwijzerButtontekst}
              buttonUrl={buttonUrl}
              sectionTitle="Hoe"
              testID={`${testID}HowSection`}
              withPhoneButton={!seenonsUrl}
            />
          ) : (
            <FractionSection
              content={afvalwijzerInstructie2}
              sectionTitle="Hoe"
              testID={`${testID}HowSection`}
            />
          )}
          {!!collectionPointsMapUrl && (
            <InlineLink
              onPress={() => openWebUrl(collectionPointsMapUrl)}
              testID={`${testID}CollectionPointsLink`}>
              Kaart met afvalpunten in de buurt
            </InlineLink>
          )}
        </Column>
        <FractionSection
          content={capitalizeString(
            afvalwijzerAfvalkalenderFrequentie
              ? `${
                  formatEnumeration(afvalwijzerOphaaldagen2) ?? ''
                }, ${afvalwijzerAfvalkalenderFrequentie}`
              : formatEnumeration(afvalwijzerOphaaldagen2) ?? '',
          )}
          sectionTitle="Ophaaldag"
          testID={`${testID}DaySection`}
        />
        <FractionSection
          content={getBuitenzettenContent(fraction)}
          sectionTitle="Buitenzetten"
          testID={`${testID}OutsideSection`}
        />
        <FractionSection
          content={afvalwijzerWaar}
          sectionTitle="Waar"
          testID={`${testID}WhereSection`}
          url={containerMapUrl}
        />
      </Column>
      {!!afvalwijzerAfvalkalenderOpmerking && (
        <Attention>
          <FractionContent
            content={afvalwijzerAfvalkalenderOpmerking}
            testID={`${testID}RemarksContent`}
          />
        </Attention>
      )}
    </Column>
  )
}

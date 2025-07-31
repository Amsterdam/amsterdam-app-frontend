import {pascalCase} from 'pascal-case'
import {Screen} from '@/components/features/screen/Screen'
import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {PhoneHQButton} from '@/components/ui/buttons/PhoneHQButton'
import {Accordion} from '@/components/ui/containers/Accordion'
import {Box} from '@/components/ui/containers/Box'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {appointmentSubjects} from '@/modules/redirects/data/appointmentSubjects'

export const MakeAppointmentScreen = () => (
  <Screen testID="RedirectsMakeAppointmentScreen">
    <Box>
      <Column gutter="sm">
        <Column gutter="md">
          <SingleSelectable>
            <Title text="Afspraak maken" />
            <Title
              level="h4"
              text="op Stadsloket in Amsterdam"
            />
          </SingleSelectable>
          <Paragraph>
            Bekijk voor welke onderwerpen u een afspraak kunt maken en wat u
            moet meenemen.
          </Paragraph>
        </Column>
        {appointmentSubjects.map(({requiresPhoneCall, links, text, title}) => (
          <Box key={title}>
            <Accordion
              testID={`RedirectsMakeAppointment${pascalCase(title)}Accordion`}
              title={title}>
              <Column gutter="md">
                {!!text && <Paragraph>{text}</Paragraph>}
                {!!requiresPhoneCall && (
                  <Column gutter="sm">
                    <Paragraph>
                      Een afspraak maken kan alleen telefonisch.
                    </Paragraph>
                    <Row>
                      <PhoneHQButton testID="RedirectsMakeAppointmentPhoneButton" />
                    </Row>
                  </Column>
                )}
                {!!links?.length && (
                  <Column
                    gutter="md"
                    halign="start">
                    {links.map(({label, urlKey}) => (
                      <ExternalLinkButton
                        key={label}
                        label={label}
                        noPadding
                        redirectKey={urlKey}
                        testID={`RedirectsMakeAppointment${pascalCase(label)}Link`}
                        variant="tertiary"
                      />
                    ))}
                  </Column>
                )}
              </Column>
            </Accordion>
          </Box>
        ))}
      </Column>
    </Box>
  </Screen>
)

import {pascalCase} from 'pascal-case'
import {Screen} from '@/components/features/screen/Screen'
import {PhoneHQButton} from '@/components/ui/buttons/PhoneHQButton'
import {Accordion} from '@/components/ui/containers/Accordion'
import {Box} from '@/components/ui/containers/Box'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Link} from '@/components/ui/text/Link'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {appointmentSubjects} from '@/modules/redirects/data/appointmentSubjects'
import {useGetRedirectUrlsQuery} from '@/modules/redirects/service'

export const MakeAppointmentScreen = () => {
  const openWebUrl = useOpenWebUrl()
  const {data: redirectUrls, isLoading, isError} = useGetRedirectUrlsQuery()

  return (
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
          {isLoading ? (
            <PleaseWait testID="RedirectsMakeAppointmentPleaseWait" />
          ) : isError ? (
            <SomethingWentWrong testID="RedirectsMakeAppointmentSomethingWentWrong" />
          ) : (
            appointmentSubjects.map(
              ({requiresPhoneCall, links, text, title}) => (
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
                        <Column gutter="md">
                          {links.map(({label, urlKey}) => (
                            <Link
                              key={label}
                              label={label}
                              onPress={() =>
                                redirectUrls &&
                                urlKey &&
                                openWebUrl(redirectUrls[urlKey])
                              }
                              testID={`RedirectsMakeAppointment${pascalCase(label)}Link`}
                              variant="external"
                            />
                          ))}
                        </Column>
                      )}
                    </Column>
                  </Accordion>
                </Box>
              ),
            )
          )}
        </Column>
      </Box>
    </Screen>
  )
}

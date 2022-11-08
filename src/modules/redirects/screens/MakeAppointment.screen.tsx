import React from 'react'
import {Button} from '@/components/ui/buttons'
import {Accordion, Box, SingleSelectable} from '@/components/ui/containers'
import {Column, Row, Screen} from '@/components/ui/layout'
import {Link, Paragraph, Title} from '@/components/ui/text'
import {appointmentSubjects} from '@/modules/redirects/data'
import {openPhoneUrl, openWebUrl} from '@/utils'

export const MakeAppointmentScreen = () => (
  <Screen>
    <Box>
      <Column gutter="sm">
        <Column gutter="md">
          <SingleSelectable>
            <Title text="Afspraak maken" />
            <Title level="h4" text="op Stadsloket in Amsterdam" />
          </SingleSelectable>
          <Paragraph>
            Bekijk voor welke onderwerpen u een afspraak kunt maken en wat u
            moet meenemen.
          </Paragraph>
        </Column>
        <>
          {appointmentSubjects.map(
            ({requiresPhoneCall, links, text, title}) => (
              <Accordion key={title} title={title}>
                <Column gutter="md">
                  {!!text && <Paragraph>{text}</Paragraph>}
                  {!!requiresPhoneCall && (
                    <Column gutter="sm">
                      <Paragraph>
                        Afspraak maken kan alleen telefonisch
                      </Paragraph>
                      <Row>
                        <Button
                          accessibilityLabel="Bel veertien nul twintig"
                          iconName="phone"
                          label="Bel 14 020"
                          onPress={() => {
                            openPhoneUrl('14020')
                          }}
                        />
                      </Row>
                    </Column>
                  )}
                  {!!links?.length && (
                    <Column gutter="md">
                      {links.map(({label, url}) => (
                        <Link
                          key={label}
                          label={label}
                          onPress={() => openWebUrl(url)}
                          variant="external"
                        />
                      ))}
                    </Column>
                  )}
                </Column>
              </Accordion>
            ),
          )}
        </>
      </Column>
    </Box>
  </Screen>
)

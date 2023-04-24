import {View} from 'react-native'
import {Button, PhoneButton} from '@/components/ui/buttons'
import {Column, Row} from '@/components/ui/layout'
import {Paragraph, Title} from '@/components/ui/text'
import {ProjectContact} from '@/modules/construction-work/types'
import {
  accessibleText,
  capitalizeString,
  formatPhoneNumber,
  openMailUrl,
} from '@/utils'

type Props = {
  contacts: ProjectContact[]
  emailSubject?: string
}

export const ProjectContacts = ({contacts, emailSubject}: Props) => (
  <Column gutter="xl">
    {contacts.map(({address, email, name, phone, position}) => (
      <Column gutter="md" key={name + email}>
        <View>
          {!!name && (
            <Title
              level="h3"
              testID="ConstructionWorkProjectContactTitle"
              text={name}
            />
          )}
          {!!position && (
            <Paragraph testID="ConstructionWorkProjectContactJobTitle">
              {capitalizeString(position)}
            </Paragraph>
          )}
        </View>
        {!!phone && (
          <Row>
            <PhoneButton
              accessibilityLabel={accessibleText(
                'Bel',
                ...(formatPhoneNumber(phone) ?? '').split(' '),
              )}
              label={formatPhoneNumber(phone)}
              phoneNumber={phone}
              testID="ConstructionWorkProjectContactPhone"
            />
          </Row>
        )}
        {!!email && (
          <Row>
            <Button
              accessibilityLabel={accessibleText(
                'Stuur een e-mail naar',
                email,
              )}
              ellipsizeMode="tail"
              iconName="email"
              label={email}
              numberOfLines={1}
              onPress={() => {
                openMailUrl(email, emailSubject)
              }}
              testID="ConstructionWorkProjectContactEmail"
            />
          </Row>
        )}
        {!!address && (
          <Paragraph testID="ConstructionWorkProjectContactAddress">
            {address}
          </Paragraph>
        )}
      </Column>
    ))}
  </Column>
)

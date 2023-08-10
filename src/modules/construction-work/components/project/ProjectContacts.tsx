import {View} from 'react-native'
import {Button} from '@/components/ui/buttons/Button'
import {PhoneButton} from '@/components/ui/buttons/PhoneButton'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useOpenMailUrl} from '@/hooks/linking/useOpenMailUrl'
import {ProjectContact} from '@/modules/construction-work/types'
import {accessibleText} from '@/utils/accessibility/accessibleText'
import {capitalizeString} from '@/utils/capitalizeString'

type Props = {
  contacts: ProjectContact[]
  emailSubject?: string
}

export const ProjectContacts = ({contacts, emailSubject}: Props) => {
  const openMailUrl = useOpenMailUrl()

  return (
    <Column gutter="xl">
      {contacts.map(({address, email, name, phone, position}) => (
        <Column
          gutter="md"
          key={name + email}>
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
}

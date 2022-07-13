import Email from '@amsterdam/asc-assets/static/icons/Email.svg'
import Phone from '@amsterdam/asc-assets/static/icons/Phone.svg'
import React from 'react'
import {View} from 'react-native'
import {Button} from '@/components/ui/buttons'
import {Column, Row} from '@/components/ui/layout'
import {Paragraph, Title} from '@/components/ui/text'
import {ProjectContact} from '@/modules/construction-work/types'
import {useTheme} from '@/themes'
import {
  accessibleText,
  capitalizeString,
  openMailUrl,
  openPhoneUrl,
} from '@/utils'

type Props = {
  contacts: ProjectContact[]
  emailSubject?: string
}

export const ProjectContacts = ({contacts, emailSubject}: Props) => {
  const {color} = useTheme()

  return (
    <Column gutter="xl">
      {contacts.map(({address, email, name, phone, position}) => (
        <Column gutter="md" key={name + email}>
          <View>
            {name && <Title level="h3" text={name} />}
            {position && <Paragraph>{capitalizeString(position)}</Paragraph>}
          </View>
          {phone && (
            <Row>
              <Button
                icon={<Phone fill={color.text.inverse} />}
                label={phone}
                onPress={() => {
                  openPhoneUrl(phone)
                }}
              />
            </Row>
          )}
          {email && (
            <Row>
              <Button
                accessibilityLabel={accessibleText(
                  'Stuur een e-mail naar',
                  email,
                )}
                icon={<Email fill={color.text.inverse} />}
                label={email}
                onPress={() => {
                  openMailUrl(email, emailSubject)
                }}
              />
            </Row>
          )}
          {address && <Paragraph>{address}</Paragraph>}
        </Column>
      ))}
    </Column>
  )
}

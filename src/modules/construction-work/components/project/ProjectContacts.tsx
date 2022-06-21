import Email from '@amsterdam/asc-assets/static/icons/Email.svg'
import Phone from '@amsterdam/asc-assets/static/icons/Phone.svg'
import React from 'react'
import {View} from 'react-native'
import {useSelector} from 'react-redux'
import {Button} from '../../../../components/ui'
import {Column, Row} from '../../../../components/ui/layout'
import {selectTheme} from '../../../../themes'
import {ProjectContact} from '../../../../types'
import {capitalizeString, openMailUrl, openPhoneUrl} from '../../../../utils'
import {Paragraph, Title} from '@/components/ui/text'

type Props = {
  contacts: ProjectContact[]
  emailSubject?: string
}

export const ProjectContacts = ({contacts, emailSubject}: Props) => {
  const {
    theme: {color},
  } = useSelector(selectTheme)

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
                onPress={() => {
                  openPhoneUrl(phone)
                }}
                text={phone}
              />
            </Row>
          )}
          {email && (
            <Row>
              <Button
                icon={<Email fill={color.text.inverse} />}
                onPress={() => {
                  openMailUrl(email, emailSubject)
                }}
                text={email}
              />
            </Row>
          )}
          {address && <Paragraph>{address}</Paragraph>}
        </Column>
      ))}
    </Column>
  )
}

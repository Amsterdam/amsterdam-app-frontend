import Email from '@amsterdam/asc-assets/static/icons/Email.svg'
import Phone from '@amsterdam/asc-assets/static/icons/Phone.svg'
import React from 'react'
import {View, Linking} from 'react-native'
import {useSelector} from 'react-redux'
import {Button} from '../../../../components/ui'
import {Column, Row} from '../../../../components/ui/layout'
import {Paragraph, Title} from '../../../../components/ui/typography'
import {selectTheme} from '../../../../themes'
import {ContactInfo} from '../../../../types'
import {capitalizeString} from '../../../../utils'

type Props = {
  contacts: ContactInfo[]
}

export const ProjectContacts = ({contacts}: Props) => {
  const {theme} = useSelector(selectTheme)

  return (
    <>
      {contacts.map(({address, email, name, phone, position}) => (
        <Column gutter="sm" key={name + email}>
          <View>
            {name && <Title level="h2" text={name} />}
            {position && <Paragraph>{capitalizeString(position)}</Paragraph>}
          </View>
          {phone && (
            <Row>
              <Button
                icon={<Phone fill={theme.color.text.inverted} />}
                onPress={() => {
                  Linking.openURL(`tel:${phone}`)
                }}
                text={phone}
              />
            </Row>
          )}
          {email && (
            <Row>
              <Button
                icon={<Email fill={theme.color.text.inverted} />}
                onPress={() => {
                  Linking.openURL(`mailto:${email}`)
                }}
                text={email}
              />
            </Row>
          )}
          {address && <Paragraph>{address}</Paragraph>}
        </Column>
      ))}
    </>
  )
}

import Email from '@amsterdam/asc-assets/static/icons/Email.svg'
import React from 'react'
import {View} from 'react-native'
import {Box, Button, Text} from '../components/ui'
import {Column, Row, ScrollView} from '../components/ui/layout'
import {color} from '../tokens'
import {openMailUrl} from '../utils'

export const ContactScreen = () => {
  const emailAddress = 'app@amsterdam.nl'

  return (
    <ScrollView>
      <Box>
        <Box background="white">
          <Column gutter="md">
            <View>
              <Text>
                Binnenkort vind je hier informatie over de stadsdeelkantoren. In
                de tussentijd kun je ons mailen als je wilt, kijk eens wat een
                tof adres:
              </Text>
            </View>
            <Row>
              <Button
                icon={<Email fill={color.font.inverse} />}
                onPress={() => openMailUrl(emailAddress)}
                text={emailAddress}
              />
            </Row>
          </Column>
        </Box>
      </Box>
    </ScrollView>
  )
}

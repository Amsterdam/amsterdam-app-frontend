import React from 'react'
import {View} from 'react-native'
import {Box, Text, Title} from '../../../components/ui'
import {Column, Gutter, Row} from '../../../components/ui/layout'
import {Image} from '../../../components/ui/media'
import {openWebUrl} from '../../../utils/openWebUrl'
import {TextButton} from '@/components/ui/buttons'

export const ReferToWebsiteCard = () => (
  <Box>
    <Column gutter="md">
      <Row>
        <Image
          source={require('../../../assets/images/refer-to-website-hero.jpg')}
        />
      </Row>
      <View>
        <Title level={2} text="Niet gevonden wat u zocht?" />
        <Text>
          De app is nog in ontwikkeling en niet alle informatie is hier in
          verwerkt. Kijk ook op amsterdam.nl voor meer informatie.
        </Text>
      </View>
      <Row align="start">
        <TextButton
          accessibilityLabel="Naar amsterdam punt nl"
          accessibilityRole="link"
          direction="forward"
          label="Naar amsterdam.nl"
          onPress={() => openWebUrl('https://www.amsterdam.nl/')}
        />
      </Row>
    </Column>
    <Gutter height="lg" />
  </Box>
)

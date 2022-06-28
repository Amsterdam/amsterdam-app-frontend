import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Card, CardBody, Text, Title} from '../../../components/ui'
import {Gutter, Row} from '../../../components/ui/layout'
import {Image} from '../../../components/ui/media'
import {openWebUrl} from '../../../utils/openWebUrl'
import {TextButton} from '@/components/ui/buttons'

export const ReferToWebsiteCard = () => (
  <Card>
    <View style={styles.figure}>
      <Image
        source={require('../../../assets/images/refer-to-website-hero.jpg')}
      />
    </View>
    <CardBody>
      <Title level={2} text="Niet gevonden wat u zocht?" />
      <Text>
        De app is nog in ontwikkeling en niet alle informatie is hier in
        verwerkt. Kijk ook op amsterdam.nl voor meer informatie.
      </Text>
      <Gutter height="md" />
      <Row align="start">
        <TextButton
          accessibilityLabel="Naar amsterdam punt nl"
          accessibilityRole="link"
          direction="forward"
          onPress={() => openWebUrl('https://www.amsterdam.nl/')}
          text="Naar amsterdam.nl"
        />
      </Row>
    </CardBody>
  </Card>
)

const styles = StyleSheet.create({
  figure: {
    flexDirection: 'row',
  },
})

import React from 'react'
import {Linking, StyleSheet, View} from 'react-native'
import {
  Card,
  CardBody,
  CardHeader,
  Gutter,
  Image,
  Link,
  Text,
  Title,
} from '../../../components/ui'
import {size} from '../../../tokens'

export const WasteGuideContainers = () => (
  <Card>
    <CardHeader>
      <Title level={4} text="Containers in de buurt" />
    </CardHeader>
    <CardBody>
      <Text>
        Zoekt u een container voor glas, papier, textiel, plastic verpakkingen
        of restafval?
      </Text>
      <Gutter height={size.spacing.md} />
      <Link
        direction="forward"
        emphasis
        onPress={() =>
          Linking.openURL(
            'https://kaart.amsterdam.nl/afvalcontainers#52.3524/4.8854/52.3575/4.8964/brt/12491,12492,12493,12494,12495,12496,12497//',
          )
        }
        text="Bekijk de kaart met containers in de buurt"
      />
      <Gutter height={size.spacing.md} />
      <View style={styles.figure}>
        <Image
          source={require('../../../assets/images/placeholder-map-containers.jpg')}
          style={styles.image}
        />
      </View>
    </CardBody>
  </Card>
)

const styles = StyleSheet.create({
  figure: {
    flexDirection: 'row',
  },
  image: {
    aspectRatio: 632 / 220,
    flexShrink: 1,
  },
})

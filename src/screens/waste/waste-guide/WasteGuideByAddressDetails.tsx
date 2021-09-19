import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import {RootStackParamList, routes} from '../../../../App'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  DescriptionList,
  Gutter,
  Link,
  Title,
} from '../../../components/ui'
import {size} from '../../../tokens'
import {WasteGuideDetails} from './types'

type Props = {
  details: WasteGuideDetails
  footerLink?: {
    text: string
    onPress: () => void
  }
}

export const WasteGuideByAddressDetails = ({details, footerLink}: Props) => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Waste'>>()

  const {
    appointmentUrl,
    collectionDays,
    howToOffer,
    remark,
    title,
    whenToPutOut,
  } = details

  return (
    <Card>
      <CardHeader>
        <Title level={4} text={title} />
      </CardHeader>
      <CardBody>
        <DescriptionList
          items={[
            {
              label: 'Hoe',
              value: howToOffer,
            },
            {
              label: collectionDays?.includes(' en ')
                ? 'Ophaaldagen'
                : 'Ophaaldag',
              value: collectionDays,
            },
            {
              label: 'Buiten zetten',
              value: whenToPutOut,
            },
            {
              label: 'Opmerking',
              value: remark,
            },
          ]}
        />
        {appointmentUrl && (
          <View style={styles.alignLeft}>
            <Gutter height={size.spacing.md} />
            <Button
              onPress={() =>
                navigation.navigate(routes.webView.name, {
                  sliceFromTop: {portrait: 162, landscape: 208},
                  title: 'Afspraak grof afval ophalen',
                  uri: appointmentUrl,
                })
              }
              text="Maak een afspraak"
            />
          </View>
        )}
        {footerLink && (
          <>
            <Gutter height={size.spacing.md} />
            <Link
              direction="forward"
              emphasis
              onPress={footerLink.onPress}
              text={footerLink.text}
            />
          </>
        )}
      </CardBody>
    </Card>
  )
}

const styles = StyleSheet.create({
  alignLeft: {
    alignItems: 'flex-start',
  },
})

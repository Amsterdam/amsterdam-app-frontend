import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useCallback, useEffect, useState} from 'react'
import {ActivityIndicator} from 'react-native'
import {StackParams} from '../../../app/navigation'
import {routes} from '../../../app/navigation/routes'
import {useAsyncStorage} from '../../../hooks'
import {Address as AddressType} from '../../../types'
import {
  Attention,
  Box,
  Button,
  Card,
  CardBody,
  SingleSelectable,
  Text,
  TextButton,
  Title,
} from '../../ui'
import {Gutter, Row} from '../../ui/layout'
import {AddressFormTeaser} from './'

export const Address = () => {
  const [address, setAddress] = useState<AddressType | undefined>(undefined)
  const [isLoading, setLoading] = useState(true)

  const asyncStorage = useAsyncStorage()
  const navigation = useNavigation<StackNavigationProp<StackParams, 'Home'>>()

  const retrieveAddress = useCallback(async () => {
    const addressFromStore = await asyncStorage.getValue('address')
    setAddress(addressFromStore)
    setLoading(false)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    retrieveAddress()
    const willFocusSubscription = navigation.addListener('focus', () => {
      retrieveAddress()
    })

    return willFocusSubscription
  }, [navigation, retrieveAddress])

  return (
    <>
      {isLoading ? (
        <Box>
          <ActivityIndicator />
        </Box>
      ) : address ? (
        <Card>
          <CardBody>
            <SingleSelectable>
              <Text secondary>Uw adres:</Text>
              <Gutter height="sm" />
              <Title level={4} margin text={address.adres} />
              <Text>{[address.postcode, address.woonplaats].join(' ')}</Text>
            </SingleSelectable>
            <Gutter height="md" />
            <Row align="between" valign="center">
              <Button
                variant="inverse"
                onPress={() => navigation.navigate(routes.addressForm.name)}
                text="Wijzig adres"
              />
              <TextButton
                emphasis
                icon="remove"
                onPress={() => console.log('remove')}
                text="Verwijder adres"
              />
            </Row>
          </CardBody>
        </Card>
      ) : (
        <>
          <AddressFormTeaser
            text="Vul uw adres en huisnummer in zodat we informatie uit uw buurt kunnen tonen."
            title="Uw buurt"
          />
          <Gutter height="md" />
          <Attention>
            <Text>
              Uw adres wordt alleen op uw telefoon opgeslagen en gebruikt om de
              app voor u te personaliseren.
            </Text>
          </Attention>
        </>
      )}
    </>
  )
}

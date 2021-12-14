import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useCallback, useEffect, useState} from 'react'
import {ActivityIndicator} from 'react-native'
import {RootStackParamList} from '../../../../App'
import {useAsyncStorage} from '../../../hooks'
import {size} from '../../../tokens'
import {Address as AddressType} from '../../../types'
import {
  Attention,
  Box,
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
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>()

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
              <Gutter height={size.spacing.sm} />
              <Title level={4} margin text={address.adres} />
              <Text>{[address.postcode, address.woonplaats].join(' ')}</Text>
            </SingleSelectable>
            <Gutter height={size.spacing.md} />
            <Row align="start">
              <TextButton
                direction="backward"
                emphasis
                onPress={() => navigation.navigate('AddressForm')}
                text="Verander adres"
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
          <Gutter height={size.spacing.md} />
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

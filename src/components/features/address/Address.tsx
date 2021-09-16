import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useCallback, useEffect, useState} from 'react'
import {ActivityIndicator, View} from 'react-native'
import {RootStackParamList} from '../../../../App'
import {useAsyncStorage} from '../../../hooks'
import {size} from '../../../tokens'
import {Address as AddressType} from '../../../types'
import {Box, Card, CardBody, Gutter, Link, Text, Title} from '../../ui'
import {EnterAddressCard} from '../EnterAddressCard'

export const Address = () => {
  const [address, setAddress] = useState<AddressType | undefined>(undefined)
  const [isLoading, setLoading] = useState(true)

  const asyncStorage = useAsyncStorage()
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>()

  const retrieveAddress = useCallback(async () => {
    const addressFromStore = await asyncStorage.getData('address')
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
            <View accessible={true}>
              <Text secondary>Uw adres:</Text>
              <Gutter height={size.spacing.sm} />
              <Title level={4} margin text={address.adres} />
              <Text>{[address.postcode, address.woonplaats].join(' ')}</Text>
            </View>
            <Gutter height={size.spacing.md} />
            <Link
              direction="forward"
              onPress={() => navigation.navigate('AddressForm')}
              text="Verander adres"
            />
          </CardBody>
        </Card>
      ) : (
        <EnterAddressCard
          text="Vul uw adres en huisnummer in zodat we informatie uit uw buurt
          kunnen tonen."
          title="Uw buurt"
        />
      )}
    </>
  )
}

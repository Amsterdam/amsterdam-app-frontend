import React, {useCallback, useEffect, useRef, useState} from 'react'
import {ActivityIndicator, Animated} from 'react-native'
import {useAsyncStorage} from '../../hooks/useAsyncStorage'
import {size} from '../../tokens'
import {color} from '../../tokens/color'
import {Address} from '../../types/address'
import {Box, Button, Card, CardBody, Gutter, Text, Title} from '../ui'
import {AddressForm} from './AddressForm'

export const OnboardingAddress = () => {
  const [address, setAddress] = useState<any>(null)
  const [isLoading, setLoading] = useState(true)
  const [isFocusInput, setFocusInput] = useState(false)
  const fadeAnim = useRef(new Animated.Value(1)).current
  const bgAnim = useRef(new Animated.Value(0)).current
  const moveUpAnim = useRef(new Animated.Value(0)).current
  const [layoutY, setLayoutY] = useState<number | null>(null)

  const asyncStorage = useAsyncStorage()

  const bgColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [color.background.light, color.background.lighter],
  })

  const y = moveUpAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, layoutY ? -layoutY : 0],
  })

  const toggleLayout = useCallback(() => {
    if (isFocusInput) {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(bgAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
          }),
        ]),
        Animated.timing(moveUpAnim, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      Animated.sequence([
        Animated.timing(moveUpAnim, {
          duration: 300,
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            useNativeDriver: true,
          }),
          Animated.timing(bgAnim, {
            toValue: 0,
            useNativeDriver: false,
          }),
        ]),
      ]).start()
    }
  }, [fadeAnim, isFocusInput, bgAnim, moveUpAnim])

  useEffect(() => {
    toggleLayout()
  }, [toggleLayout])

  const storeAddress = async (responseAddress: Address) => {
    setFocusInput(false)
    const {adres, centroid, huisnummer, postcode, straatnaam, woonplaats} =
      responseAddress
    setAddress(responseAddress)
    await asyncStorage.storeData('address', {
      adres,
      centroid,
      huisnummer,
      postcode,
      straatnaam,
      woonplaats,
    })
  }

  const retrieveAddress = useCallback(async () => {
    setLoading(true)
    const addressFromStore = await asyncStorage.getData('address')
    setAddress(addressFromStore)
    setLoading(false)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    retrieveAddress()
  }, [retrieveAddress])

  return (
    <>
      {isLoading ? (
        <Box>
          <ActivityIndicator />
        </Box>
      ) : address ? (
        <Box>
          <Card>
            <CardBody centerContent>
              <Text secondary>Uw adres is:</Text>
              <Gutter height={size.spacing.md} />
              <Title level={4} margin text={address.adres} />
              <Text>{[address.postcode, address.woonplaats].join(' ')}</Text>
              <Button
                onPress={() => setAddress(null)}
                text="Verander adres"
                variant="text"
              />
            </CardBody>
          </Card>
        </Box>
      ) : (
        <Animated.View style={[{backgroundColor: bgColor}]}>
          <Box>
            <Card>
              <CardBody>
                <Animated.View style={{opacity: fadeAnim}}>
                  <Title margin text="Uw buurt" />
                  <Text margin>
                    Vul uw adres en huisnummer in zodat we informatie uit uw
                    buurt kunnen tonen.
                  </Text>
                </Animated.View>
                <Animated.View
                  onLayout={event => setLayoutY(event.nativeEvent.layout.y)}
                  style={{transform: [{translateY: y}]}}>
                  <AddressForm
                    onFocusInput={setFocusInput}
                    onSubmit={storeAddress}
                  />
                </Animated.View>
              </CardBody>
            </Card>
          </Box>
        </Animated.View>
      )}
    </>
  )
}

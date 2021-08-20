import React, {useEffect, useRef, useState} from 'react'
import {useCallback} from 'react'
import {Animated} from 'react-native'
import {AddressForm} from '../components/features/AddressForm'
import {Box, Card, CardBody, ScreenWrapper, Text, Title} from '../components/ui'
import {color} from '../tokens'

export const OnboardingScreen = () => {
  const [isFocusInput, setFocusInput] = useState(false)
  const fadeAnim = useRef(new Animated.Value(1)).current
  const bgAnim = useRef(new Animated.Value(0)).current
  const moveUpAnim = useRef(new Animated.Value(0)).current
  const [layoutY, setLayoutY] = useState<number | null>(null)

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

  const onSubmit = (value: {_display: string; uri: string}) => {
    console.log({value})
    setFocusInput(false)
  }

  return (
    <ScreenWrapper>
      <Animated.View style={[{backgroundColor: bgColor}, {flex: 1}]}>
        <Box>
          <Card>
            <CardBody>
              <Animated.View style={{opacity: fadeAnim}}>
                <Title margin text="Uw buurt" />
                <Text margin>
                  Vul uw adres en huisnnummer in zodat we informatie uit uw
                  buurt kunnen tonen.*
                </Text>
              </Animated.View>
              <Animated.View
                onLayout={event => setLayoutY(event.nativeEvent.layout.y)}
                style={{transform: [{translateY: y}]}}>
                <AddressForm onFocusInput={setFocusInput} onSubmit={onSubmit} />
              </Animated.View>
            </CardBody>
          </Card>
        </Box>
      </Animated.View>
    </ScreenWrapper>
  )
}

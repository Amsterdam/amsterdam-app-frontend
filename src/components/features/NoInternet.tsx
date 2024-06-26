import NetInfo from '@react-native-community/netinfo'
import {useState, useEffect, memo} from 'react'
import {StyleSheet, View} from 'react-native'
import {SlideInDown, SlideOutDown} from 'react-native-reanimated'
import Animated from 'react-native-reanimated'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Box} from '@/components/ui/containers/Box'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {useAccessibilityAnnounce} from '@/hooks/accessibility/useAccessibilityAnnounce'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

export const NoInternet = memo(() => {
  const [hasInternet, setHasInternet] = useState(true)
  const [isClosed, setIsClosed] = useState(false)
  const styles = useThemable(createStyles)
  const accessibilityAnnounce = useAccessibilityAnnounce()

  useEffect(
    () =>
      NetInfo.addEventListener(({isInternetReachable}) => {
        if (isInternetReachable) {
          if (!hasInternet) {
            accessibilityAnnounce('Internet verbinding hersteld.')
            setHasInternet(true)
          }
        } else if (isInternetReachable === false) {
          setIsClosed(false)
          setHasInternet(false)
          accessibilityAnnounce('Geen internetverbinding.')
        }
      }),
    [accessibilityAnnounce, hasInternet],
  )

  return (
    <>
      {!hasInternet && !isClosed ? (
        <View style={styles.container}>
          <Animated.View
            entering={SlideInDown}
            exiting={SlideOutDown}>
            <View style={styles.inner}>
              <Box
                insetHorizontal="md"
                insetVertical="sm">
                <Row
                  align="between"
                  valign="center">
                  <Icon
                    color="inverse"
                    name="wifi-disconnect"
                    size="lg"
                    testID="NoInternetIcon"
                  />
                  <Phrase
                    color="inverse"
                    emphasis="strong"
                    testID="NoInternetPhrase">
                    Geen internetverbinding
                  </Phrase>
                  <IconButton
                    accessibilityHint="Sluit deze melding"
                    icon={
                      <Icon
                        color="inverse"
                        name="close"
                        testID="NoInternetCloseIcon"
                      />
                    }
                    onPress={() => setIsClosed(true)}
                    testID="NoInternetCloseButton"
                  />
                </Row>
              </Box>
            </View>
          </Animated.View>
        </View>
      ) : null}
    </>
  )
})

const createStyles = ({color, size}: Theme) =>
  StyleSheet.create({
    container: {
      margin: size.spacing.xl,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
    inner: {
      backgroundColor: color.background.warning,
      elevation: 2,
      shadowColor: color.shadow.default,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 4,
      shadowOpacity: 0.3,
    },
  })

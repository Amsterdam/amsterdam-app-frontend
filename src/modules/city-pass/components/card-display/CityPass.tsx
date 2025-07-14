import {
  type ScrollView as ScrollViewType,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native'
import {HideFromAccessibility} from '@/components/features/accessibility/HideFromAccessibility'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Delay} from '@/components/ui/layout/Delay'
import {Gutter} from '@/components/ui/layout/Gutter'
import {ScrollView} from '@/components/ui/layout/ScrollView'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {useAccessibilityAutoFocus} from '@/hooks/accessibility/useAccessibilityAutoFocus'
import Logo from '@/modules/city-pass/assets/logo.svg'
import {BarCode} from '@/modules/city-pass/components/card-display/BarCode'
import {CITY_PASS_HEIGHT} from '@/modules/city-pass/constants'
import {CityPassPass} from '@/modules/city-pass/types'
import {getPassWidth} from '@/modules/city-pass/utils/getPassWidth'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'
import {accessibleText} from '@/utils/accessibility/accessibleText'
import {stringGroupInto} from '@/utils/stringGroupInto'

const PASS_BORDER_RADIUS = 10

type Props = {
  cityPass: CityPassPass
  index: number
  isCurrentIndex?: boolean
  itemCount: number
}

export const CityPass = ({
  index,
  isCurrentIndex,
  itemCount,
  cityPass: {
    actief,
    firstname,
    infix,
    lastname,
    passNumberComplete,
    dateEndFormatted,
  },
}: Props) => {
  const {width: windowWidth} = useWindowDimensions()
  const passWidth = getPassWidth(windowWidth)
  const accessibilityAutoFocusRef = useAccessibilityAutoFocus<ScrollViewType>({
    isActive: isCurrentIndex,
  })
  const styles = useThemable(theme => createStyles(theme, passWidth))

  const accessibilityLabel =
    actief === false
      ? `De stadspas van ${firstname} ${infix ?? ''} ${lastname} is geblokkeerd. Bel ${accessibleText('020 252 6000')} om te deblokkeren.`
      : `De stadspas van ${firstname} ${infix ?? ''} ${lastname} kan nu gescand worden. Stadspas ${stringGroupInto(passNumberComplete, 4)}. Geldig tot en met ${dateEndFormatted}. Pas ${index + 1} van ${itemCount}. Swipe naar links of rechts om door de passen te navigeren.`

  return (
    <HideFromAccessibility
      hide={!isCurrentIndex}
      style={styles.container}>
      <View style={styles.containerInner}>
        <ScrollView
          accessibilityLabel={accessibilityLabel}
          accessible
          ref={accessibilityAutoFocusRef}
          style={styles.pass}>
          <HideFromAccessibility>
            <Column
              grow={1}
              gutter="md">
              <View style={styles.passHeader}>
                <Box>
                  <Logo />
                </Box>
              </View>
              <View style={styles.passInner}>
                <Column
                  grow={1}
                  gutter="md"
                  halign="center">
                  <Phrase
                    emphasis="strong"
                    testID="CityPassCityPassNamePhrase">
                    {firstname} {infix} {lastname}
                  </Phrase>
                  <Column halign="center">
                    {actief === false ? (
                      <>
                        <Gutter height="md" />
                        <Phrase
                          color="warning"
                          emphasis="strong"
                          testID="CityPassCityPassBlockedPhrase">
                          Geblokkeerd
                        </Phrase>
                        <Gutter height="xl" />
                      </>
                    ) : (
                      <Delay>
                        <BarCode
                          format="CODE128"
                          value={passNumberComplete}
                          width={passWidth}
                        />
                      </Delay>
                    )}
                    <View style={styles.passNumber}>
                      <Phrase
                        emphasis="strong"
                        testID="CityPassCityPassPassNumber">
                        {stringGroupInto(passNumberComplete, 4)}
                      </Phrase>
                    </View>
                  </Column>
                  {actief !== false && (
                    <>
                      <Delay>
                        <BarCode
                          format="QR"
                          value={passNumberComplete}
                        />
                      </Delay>
                      <Paragraph textAlign="center">
                        Geldig tot en met {dateEndFormatted}
                      </Paragraph>
                    </>
                  )}
                </Column>
              </View>
            </Column>
          </HideFromAccessibility>
        </ScrollView>
      </View>
    </HideFromAccessibility>
  )
}

const createStyles = ({color, size}: Theme, passWidth: number) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    containerInner: {
      overflow: 'hidden', // to make sure the border radius is visible in all cases
      borderRadius: PASS_BORDER_RADIUS,
    },
    pass: {
      backgroundColor: color.cityPass.passBackground,
      width: passWidth,
      maxHeight: CITY_PASS_HEIGHT,
      borderRadius: PASS_BORDER_RADIUS,
    },
    passHeader: {
      backgroundColor: color.cityPass.passHeader,
      borderTopLeftRadius: PASS_BORDER_RADIUS,
      borderTopRightRadius: PASS_BORDER_RADIUS,
    },
    passInner: {
      backgroundColor: color.cityPass.passInner,
      borderRadius: PASS_BORDER_RADIUS,
      paddingTop: size.spacing.md,
      paddingBottom: size.spacing.md,
    },
    passNumber: {
      marginTop: -size.spacing.md,
    },
  })

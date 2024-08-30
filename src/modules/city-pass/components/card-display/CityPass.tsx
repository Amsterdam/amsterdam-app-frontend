import {
  type ScrollView as ScrollViewType,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native'
import {HideFromAccessibility} from '@/components/features/accessibility/HideFromAccessibility'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
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
  cityPass: {firstname, infix, lastname, passNumberComplete, dateEndFormatted},
}: Props) => {
  const {width: windowWidth} = useWindowDimensions()
  const passWidth = getPassWidth(windowWidth)
  const accessibilityAutoFocusRef = useAccessibilityAutoFocus<ScrollViewType>({
    isActive: isCurrentIndex,
  })
  const styles = useThemable(theme => createStyles(theme, passWidth))

  return (
    <HideFromAccessibility
      hide={!isCurrentIndex}
      style={styles.container}>
      <View style={styles.containerInner}>
        <ScrollView
          accessibilityLabel={`De stadspas van ${firstname} ${infix ? infix : ''} ${lastname} kan nu gescand worden. Stadspas ${stringGroupInto(passNumberComplete, 4)}. Geldig tot en met ${dateEndFormatted}. Pas ${index + 1} van ${itemCount}. Swipe naar links of rechts om door de passen te navigeren.`}
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
                    testID="CityPassCityPassName">
                    {firstname} {infix} {lastname}
                  </Phrase>
                  <Column halign="center">
                    <BarCode
                      format="CODE128"
                      value={passNumberComplete}
                      width={passWidth}
                    />
                    <View style={styles.passNumber}>
                      <Phrase
                        emphasis="strong"
                        testID="CityPassCityPassPassNumber">
                        {stringGroupInto(passNumberComplete, 4)}
                      </Phrase>
                    </View>
                  </Column>
                  <BarCode
                    format="QR"
                    value={passNumberComplete}
                  />
                  <Paragraph textAlign="center">
                    Geldig tot en met {dateEndFormatted}
                  </Paragraph>
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
      flex: 1,
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

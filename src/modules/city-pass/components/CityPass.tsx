import {StyleSheet, useWindowDimensions, View} from 'react-native'
import {HideFromAccessibility} from '@/components/features/accessibility/HideFromAccessibility'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {ScrollView} from '@/components/ui/layout/ScrollView'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import Logo from '@/modules/city-pass/assets/logo.svg'
import {BarCode} from '@/modules/city-pass/components/BarCode'
import {
  DEFAULT_PASS_WIDTH,
  CITY_PASS_HEIGHT,
} from '@/modules/city-pass/constants'
import {PassOwner} from '@/modules/city-pass/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'
import {formatDate} from '@/utils/datetime/formatDate'

const PASS_BORDER_RADIUS = 10

const cityPass = {
  actief: true,
  balance_update_time: '2020-04-02T12:45:41.000Z',
  budgetten: [
    {
      code: 'AMSTEG_10-14',
      naam: 'Kindtegoed 10-14',
      omschrijving: 'Kindtegoed',
      expiry_date: '2021-08-31T21:59:59.000Z',
      budget_assigned: 150,
      budget_balance: 0,
    },
    {
      code: 'AMSTEG_06-30',
      naam: 'Kindtegoed 30-06',
      omschrijving: 'Kindtegoed',
      expiry_date: '2021-08-31T21:59:59.000Z',
      budget_assigned: 75,
      budget_balance: 0,
    },
  ],
  budgetten_actief: true,
  categorie: 'Amsterdamse Digitale Stadspas',
  categorie_code: 'A',
  expiry_date: '2020-08-31T23:59:59.000Z',
  id: 999999,
  originele_pas: {
    categorie: 'Amsterdamse Digitale Stadspas',
    categorie_code: 'A',
    id: 888888,
    pasnummer: 8888888888888,
    pasnummer_volledig: '8888888888888888888',
    passoort: {
      id: 11,
      naam: 'Digitale Stadspas',
    },
  },
  pasnummer: 6666666666666,
  pasnummer_volledig: '6666666666666666666',
  passoort: {
    id: 11,
    naam: 'Digitale Stadspas',
  },
}

type Props = {
  index: number
  itemCount: number
  passOwner: PassOwner
}

export const CityPass = ({index, itemCount, passOwner}: Props) => {
  const {achternaam, initialen} = passOwner
  const activePass = passOwner.passen.find(pass => pass.actief)
  const passNumber = activePass?.pasnummer.toString() ?? '0'
  const {width} = useWindowDimensions()
  const passWidth = Math.min(width, DEFAULT_PASS_WIDTH)
  const styles = useThemable(theme => createStyles(theme, passWidth, width))

  return (
    <View style={styles.container}>
      <View style={styles.containerInner}>
        <ScrollView
          accessibilityLabel={`De stadspas van ${initialen} ${achternaam} kan nu gescand worden. Stadspas ${passNumber}. Geldig tot en met ${formatDate(cityPass.expiry_date)}. Pas ${index + 1} van ${itemCount}. Swipe naar links of rechts om door de passen te navigeren.`}
          accessible
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
                    {initialen} {achternaam}
                  </Phrase>
                  <Column halign="center">
                    <BarCode
                      format="CODE128"
                      value={passNumber}
                      width={passWidth}
                    />
                    <View style={styles.passNumber}>
                      <Phrase
                        emphasis="strong"
                        testID="CityPassCityPassPassNumber">
                        {passNumber}
                      </Phrase>
                    </View>
                  </Column>
                  <BarCode
                    format="QR"
                    value={passNumber}
                  />
                  <Paragraph textAlign="center">
                    Geldig tot en met {formatDate(cityPass.expiry_date)}
                  </Paragraph>
                </Column>
              </View>
            </Column>
          </HideFromAccessibility>
        </ScrollView>
      </View>
    </View>
  )
}

const createStyles = ({color, size}: Theme, passWidth: number, width: number) =>
  StyleSheet.create({
    container: {
      width,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    containerInner: {
      overflow: 'hidden',
      borderRadius: 10,
    },
    pass: {
      backgroundColor: color.background.cutout,
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
      backgroundColor: color.background.cutout,
      borderRadius: PASS_BORDER_RADIUS,
      paddingTop: size.spacing.md,
      paddingBottom: size.spacing.md,
    },
    passNumber: {
      marginTop: -size.spacing.md,
    },
  })

import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {StyleSheet, View} from 'react-native'
import {RootStackParams} from '@/app/navigation'
import {Button} from '@/components/ui/buttons'
import {Box, HorizontalSafeArea} from '@/components/ui/containers'
import {Column, Row, Screen} from '@/components/ui/layout'
import {FigureWithCanalHouseFacadesBackground} from '@/components/ui/media'
import {Title} from '@/components/ui/text'
import {TwoPeopleWalking} from '@/modules/redirects/assets/images'
import {RedirectsRouteName} from '@/modules/redirects/routes'
import {Device, DeviceContext} from '@/providers'
import {useTheme} from '@/themes'
import {openWebUrl} from '@/utils'

type Props = {
  navigation: StackNavigationProp<
    RootStackParams,
    RedirectsRouteName.selectCity
  >
}

const appointmentFormWeespUrl =
  'https://formulieren.amsterdam.nl/TriplEforms/DirectRegelen/formulier/nl-NL/evAmsterdam/afspraakmakenweesp.aspx'

export const SelectCityScreen = ({navigation}: Props) => {
  const {isLandscape} = useContext(DeviceContext)
  const {media} = useTheme()
  const styles = createStyles(isLandscape)

  return (
    <Screen
      scroll={false}
      withLeftInset={!isLandscape}
      withRightInset={!isLandscape}>
      <Column align="between" grow>
        <HorizontalSafeArea>
          <Box>
            <Column gutter="md">
              <Title text="Waar wilt u een afspraak maken?" />
              <Row gutter="md">
                <Column flex={1}>
                  <Button
                    accessibilityRole="link"
                    label="Amsterdam"
                    onPress={() =>
                      navigation.navigate(RedirectsRouteName.makeAppointment)
                    }
                  />
                </Column>
                <Column flex={1}>
                  <Button
                    accessibilityRole="link"
                    label="Weesp"
                    onPress={() => openWebUrl(appointmentFormWeespUrl)}
                    variant="secondary"
                  />
                </Column>
              </Row>
            </Column>
          </Box>
        </HorizontalSafeArea>
        <View style={styles.moveFigureUp}>
          <FigureWithCanalHouseFacadesBackground
            backgroundImageHeightFraction={0.5}
            height={media.figureHeight.xl}
            Image={<TwoPeopleWalking />}
            imageAlign="start"
            imageAspectRatio={media.imageAspectRatio.twoPersonsWalking}
            imageWidth={media.imageWidth.twoPersonsWalking}
            withWeesp
          />
        </View>
      </Column>
    </Screen>
  )
}

const createStyles = (isLandscape: Device['isLandscape']) =>
  StyleSheet.create({
    moveFigureUp: {
      marginTop: isLandscape ? -80 : undefined,
      zIndex: isLandscape ? -1 : undefined,
    },
  })

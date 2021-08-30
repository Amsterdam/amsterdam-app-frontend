import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParamList, routes} from '../../App'
import {OnboardingAddressNew} from '../components/features/OnboardingAddressNew'
import {Box, Button, Gutter, ScreenWrapper} from '../components/ui'
import {size} from '../tokens'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>
}

export const HomeScreen = ({navigation}: Props) => {
  return (
    <ScreenWrapper>
      <OnboardingAddressNew />
      <Box inset="xl">
        <Button
          onPress={() =>
            navigation.navigate(routes.webView.name, {
              title: 'Melding',
              uri: 'https://acc.meldingen.amsterdam.nl/',
            })
          }
          text="Maak een melding"
        />
        <Gutter height={size.spacing.md} />
        <Button
          onPress={() => navigation.navigate(routes.projectOverview.name)}
          text="Bekijk werkzaamheden"
        />
        <Gutter height={size.spacing.md} />
        <Button
          onPress={() => navigation.navigate(routes.wasteGuide.name)}
          text="Raadpleeg afvalinformatie"
        />
        <Gutter height={size.spacing.md} />
      </Box>
    </ScreenWrapper>
  )
}

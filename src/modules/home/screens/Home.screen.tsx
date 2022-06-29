import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {Box} from '@/components/ui'
import {AddButton} from '@/components/ui/buttons'
import {Column, Screen, ScrollView} from '@/components/ui/layout'
import {Modules} from '@/modules/home/components'
import {HomeRouteName, HomeStackParams} from '@/modules/home/routes'

export const HomeScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<HomeStackParams, HomeRouteName>>()

  return (
    <Screen>
      <ScrollView grow>
        <Column align="between">
          <Modules />
          <Box>
            <AddButton
              accessibilityLabel="Instellingen"
              onPress={() => navigation.navigate(HomeRouteName.settings)}
            />
          </Box>
        </Column>
      </ScrollView>
    </Screen>
  )
}

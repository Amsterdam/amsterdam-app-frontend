import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {Box} from '@/components/ui'
import {AddButton} from '@/components/ui/buttons'
import {Screen, ScrollView} from '@/components/ui/layout'
import {Modules} from '@/modules/home/components'
import {HomeRouteName, HomeStackParams} from '@/modules/home/routes'

export const HomeScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<HomeStackParams, HomeRouteName>>()

  return (
    <Screen safeTopInset={false}>
      <ScrollView grow>
        <Modules />
      </ScrollView>
      <Box>
        <AddButton
          accessibilityLabel="Instellingen"
          onPress={() => navigation.navigate(HomeRouteName.settings)}
        />
      </Box>
    </Screen>
  )
}

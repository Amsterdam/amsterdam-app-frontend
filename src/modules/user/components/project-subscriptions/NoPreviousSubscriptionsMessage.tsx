import {useNavigation} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {module as userModule} from '../..'
import {RootStackParamList} from '../../../../app/navigation'
import {Attention, Text, TextButton} from '../../../../components/ui'
import {Column} from '../../../../components/ui/layout'
import {module as projectsModule} from '../../../projects'
import {ProjectsRouteName} from '../../../projects/routes'

export const NoPreviousSubscriptionsMessage = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParamList, typeof userModule.name>
    >()

  return (
    <Column gutter="md">
      <Attention>
        <Text>
          U kunt nu kiezen van welke bouwprojecten u berichten wilt ontvangen.
        </Text>
      </Attention>
      <TextButton
        emphasis
        onPress={() =>
          navigation.navigate(projectsModule.name, {
            screen: ProjectsRouteName.projects,
          })
        }
        text="Naar bouwprojecten"
      />
    </Column>
  )
}

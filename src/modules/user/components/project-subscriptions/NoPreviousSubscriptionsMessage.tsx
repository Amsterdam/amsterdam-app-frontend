import {useNavigation} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {module as userModule} from '../..'
import {RootStackParamList} from '../../../../app/navigation'
import {Attention, Text, TextButton} from '../../../../components/ui'
import {Column} from '../../../../components/ui/layout'
import {module as constructionWorkModule} from '../../../construction-work'
import {ProjectsRouteName} from '../../../construction-work/routes'

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
          navigation.navigate(constructionWorkModule.name, {
            screen: ProjectsRouteName.projects,
          })
        }
        text="Naar bouwprojecten"
      />
    </Column>
  )
}

import {useNavigation} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParams} from '@/app/navigation'
import {Attention, Text} from '@/components/ui'
import {TextButton} from '@/components/ui/buttons'
import {Column} from '@/components/ui/layout'
import {module as constructionWorkModule} from '@/modules/construction-work'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {module as userModule} from '@/modules/user'

export const NoPreviousSubscriptionsMessage = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, typeof userModule.slug>
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
        label="Naar bouwprojecten"
        onPress={() =>
          navigation.navigate(constructionWorkModule.slug, {
            screen: ConstructionWorkRouteName.projects,
          })
        }
      />
    </Column>
  )
}

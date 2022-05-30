import React, {FC} from 'react'
import {Text} from '../../../components/ui'
import {ScrollView} from '../../../components/ui/layout'

export const TemplateScreen: FC = () => {
  // const navigation =
  //   useNavigation<StackNavigationProp<RootStackParamList, TemplateRouteName>>()

  return (
    <ScrollView>
      <Text>Template</Text>
    </ScrollView>
  )
}

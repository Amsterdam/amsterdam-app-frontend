import React, {FC} from 'react'
import {Box, Text} from '../../../components/ui'
import {ScrollView} from '../../../components/ui/layout'

export const TemplateScreen: FC = () => {
  // const navigation =
  //   useNavigation<StackNavigationProp<RootStackParamList, TemplateRouteName>>()

  return (
    <ScrollView>
      <Box>
        <Text>Template</Text>
      </Box>
    </ScrollView>
  )
}

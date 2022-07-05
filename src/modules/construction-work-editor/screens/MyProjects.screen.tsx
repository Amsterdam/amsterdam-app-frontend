import React, {FC} from 'react'
import {Box, Text} from '@/components/ui'
import {ScrollView} from '@/components/ui/layout'

export const MyProjectsScreen: FC = () => {
  // const navigation =
  //   useNavigation<StackNavigationProp<RootStackParams, TemplateRouteName>>()

  return (
    <ScrollView>
      <Box>
        <Text>Hallo, ik ben een module! 🎉</Text>
      </Box>
    </ScrollView>
  )
}

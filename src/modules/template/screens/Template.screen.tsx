import React, {FC} from 'react'
import {Box, Text} from '@/components/ui'
import {Screen, ScrollView} from '@/components/ui/layout'

export const TemplateScreen: FC = () => {
  // const navigation =
  //   useNavigation<StackNavigationProp<RootStackParams, TemplateRouteName>>()

  return (
    <Screen>
      <ScrollView>
        <Box>
          <Text>Hallo, ik ben een module! 🎉</Text>
        </Box>
      </ScrollView>
    </Screen>
  )
}

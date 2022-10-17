import React from 'react'
import {Box} from '@/components/ui/containers'
import {Screen} from '@/components/ui/layout'
import {Paragraph} from '@/components/ui/text'

export const TemplateScreen = () => {
  // const navigation = useNavigation<StackNavigationProp<RootStackParams, TemplateRouteName>>()

  return (
    <Screen>
      <Box>
        <Paragraph>Hallo, ik ben een module! 🎉</Paragraph>
      </Box>
    </Screen>
  )
}

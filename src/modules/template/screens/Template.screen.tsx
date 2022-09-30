import React, {FC} from 'react'
import {Box} from '@/components/ui'
import {Screen} from '@/components/ui/layout'
import {Paragraph} from '@/components/ui/text'

export const TemplateScreen: FC = () => {
  // const navigation =
  //   useNavigation<StackNavigationProp<RootStackParams, TemplateRouteName>>()

  return (
    <Screen>
      <Box>
        <Paragraph>Hallo, ik ben een module! 🎉</Paragraph>
      </Box>
    </Screen>
  )
}

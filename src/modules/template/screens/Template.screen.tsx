import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {RootStackParams} from '@/app/navigation'
import {Box} from '@/components/ui/containers'
import {Screen} from '@/components/ui/layout'
import {Paragraph} from '@/components/ui/text'
import {TemplateRouteName} from '@/modules/template/routes'

export const TemplateScreen = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigation =
    useNavigation<StackNavigationProp<RootStackParams, TemplateRouteName>>()

  return (
    <Screen>
      <Box>
        <Paragraph>Hallo, ik ben een module! 🎉</Paragraph>
      </Box>
    </Screen>
  )
}

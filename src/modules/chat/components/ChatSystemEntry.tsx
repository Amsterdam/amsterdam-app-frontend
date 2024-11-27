import {View} from 'react-native'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {SvgIconName} from '@/components/ui/media/svgIcons'
import {Phrase} from '@/components/ui/text/Phrase'
import {TestProps} from '@/components/ui/types'

type Props = {
  icon: SvgIconName
  text: string
} & TestProps

export const ChatSystemEntry = ({icon, text, testID}: Props) => (
  <View accessible>
    <Row
      align="center"
      gutter="sm"
      valign="center">
      <Icon
        color="secondary"
        name={icon}
        testID={`${testID}Icon`}
      />
      <Phrase
        color="secondary"
        testID={`${testID}Phrase`}
        textAlign="center">
        {text}
      </Phrase>
    </Row>
  </View>
)

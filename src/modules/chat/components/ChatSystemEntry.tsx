import {View} from 'react-native'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {SvgIconName} from '@/components/ui/media/svgIcons'
import {Phrase} from '@/components/ui/text/Phrase'
import {TestProps} from '@/components/ui/types'
import {dayjsFromUnix} from '@/utils/datetime/dayjs'

type Props = {
  icon: SvgIconName
  text: string
  timestamp: number
} & TestProps

export const ChatSystemEntry = ({icon, text, testID, timestamp}: Props) => (
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
        flexShrink={0}
        testID={`${testID}Phrase`}
        textAlign="center">
        {text} - {dayjsFromUnix(timestamp).format('HH:mm')}
      </Phrase>
    </Row>
  </View>
)

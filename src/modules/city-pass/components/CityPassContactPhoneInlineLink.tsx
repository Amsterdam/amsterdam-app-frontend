import {InlineLink} from '@/components/ui/text/InlineLink'
import {TestProps} from '@/components/ui/types'
import {useOpenPhoneUrl} from '@/hooks/linking/useOpenPhoneUrl'

type Props = TestProps

export const CityPassContactPhoneInlineLink = ({testID}: Props) => {
  const openPhoneUrl = useOpenPhoneUrl()

  return (
    <InlineLink
      onPress={() => openPhoneUrl('0202526000')}
      testID={testID}>
      020 252 6000
    </InlineLink>
  )
}

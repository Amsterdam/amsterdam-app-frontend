import {View} from 'react-native'
import {Phrase} from '@/components/ui/text'
import {FractionContent} from '@/modules/waste-guide/components'

type Props = {
  content?: string | null
  label: string
}

export const FractionSection = ({content, label}: Props) => {
  if (!content) {
    return null
  }

  return (
    <View>
      <Phrase emphasis="strong">{label}:</Phrase>
      <FractionContent content={content} />
    </View>
  )
}

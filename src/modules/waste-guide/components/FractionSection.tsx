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
    <Phrase>
      <Phrase emphasis="strong">{label}: </Phrase>
      <FractionContent content={content} />
    </Phrase>
  )
}

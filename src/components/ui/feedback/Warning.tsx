import {Attention} from '@/components/ui/feedback/Attention'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'

type Props = {
  text: string
  title: string
}

export const Warning = ({text, title}: Props) => (
  <Attention warning>
    <Title
      level="h5"
      text={title}
    />
    <Paragraph variant="small">{text}</Paragraph>
  </Attention>
)

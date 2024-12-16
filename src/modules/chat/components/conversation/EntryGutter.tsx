import {Gutter} from '@/components/ui/layout/Gutter'

type Props = {
  isLastOfGroup: boolean
}

export const EntryGutter = ({isLastOfGroup}: Props) => (
  <Gutter height={isLastOfGroup ? 'md' : 'sm'} />
)

import {Gutter} from '@/components/ui/layout/Gutter'

type Props = {
  isLastOfRole: boolean
}

export const EntryGutter = ({isLastOfRole}: Props) => (
  <Gutter height={isLastOfRole ? 'md' : 'sm'} />
)

import {SingleSelectable} from '@/components/ui/containers'
import {Column} from '@/components/ui/layout'
import {Paragraph, Title} from '@/components/ui/text'
import {accessibleText} from '@/utils'

type DescriptionListProps = {
  items: DescriptionListItem[]
}

export type DescriptionListItem = {
  label: string
  value?: string
}

export const DescriptionList = ({items}: DescriptionListProps) => {
  const nonEmptyItems = items.filter(item => item.value)

  return (
    <Column gutter="md">
      {nonEmptyItems.map(({label, value}) => (
        <SingleSelectable
          accessibilityLabel={accessibleText(label, value)}
          key={label}>
          <Title
            level="h5"
            text={label}
          />
          <Paragraph>{value}</Paragraph>
        </SingleSelectable>
      ))}
    </Column>
  )
}

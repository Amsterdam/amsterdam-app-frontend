import {Column} from '@/components/ui/layout'
import {RenderHtml, Title} from '@/components/ui/text'
import {Section} from '@/types'

type Props = {
  sections: Section[]
}

export const ProjectContentSections = ({sections}: Props) =>
  sections.map(section => (
    <Column gutter="sm" key={section.title}>
      <Title level="h2" text={section.title} />
      <RenderHtml content={section.html} />
    </Column>
  ))

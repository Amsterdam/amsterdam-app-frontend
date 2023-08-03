import {Column} from '@/components/ui/layout/Column'
import {HtmlContent} from '@/components/ui/text/HtmlContent'
import {Title} from '@/components/ui/text/Title'
import {Section} from '@/types/section'

type Props = {
  sections: Section[]
}

export const ProjectContentSections = ({sections}: Props) => (
  <>
    {sections.map(section => (
      <Column
        gutter="sm"
        key={section.title}>
        {section.title.length > 0 && (
          <Title
            level="h2"
            text={section.title}
          />
        )}
        <HtmlContent content={section.html} />
      </Column>
    ))}
  </>
)

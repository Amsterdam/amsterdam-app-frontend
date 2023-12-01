import {Column} from '@/components/ui/layout/Column'
import {HtmlContent} from '@/components/ui/text/HtmlContent'
import {Title} from '@/components/ui/text/Title'
import {ProjectDetailSection} from '@/modules/construction-work/types/api'

type Props = {
  sections: ProjectDetailSection[]
}

export const ProjectContentSections = ({sections}: Props) =>
  sections.map(({body, title}) =>
    body ? (
      <Column
        gutter="sm"
        key={title}>
        {!!title && (
          <Title
            level="h2"
            text={title}
          />
        )}
        {!!body && <HtmlContent content={body} />}
      </Column>
    ) : null,
  )

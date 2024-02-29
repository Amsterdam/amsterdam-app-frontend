import {Column} from '@/components/ui/layout/Column'
import {HtmlContent} from '@/components/ui/text/HtmlContent'
import {Title} from '@/components/ui/text/Title'
import {type TestProps} from '@/components/ui/types'
import {ProjectSection} from '@/modules/construction-work/types/api'

type Props = {
  sections: ProjectSection[]
} & TestProps

export const ProjectContentSections = ({sections, testID}: Props) =>
  sections.map(({body, title}, index) =>
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
        {!!body && (
          <HtmlContent
            content={body}
            testID={`${testID}${index}Html`}
          />
        )}
      </Column>
    ) : null,
  )

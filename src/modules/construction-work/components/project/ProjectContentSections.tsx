import {Column} from '@/components/ui/layout/Column'
import {HtmlContent} from '@/components/ui/text/HtmlContent'
import {Link} from '@/components/ui/text/Link'
import {Title} from '@/components/ui/text/Title'
import {type TestProps} from '@/components/ui/types'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {ProjectSection} from '@/modules/construction-work/types/api'

type Props = {
  sections: ProjectSection[]
} & TestProps

export const ProjectContentSections = ({sections, testID}: Props) => {
  const openWebUrl = useOpenWebUrl()

  return sections.map(({body, links, title}, index) =>
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
        {links?.map(({url, label}, linkIndex) => (
          <Link
            key={label}
            label={label}
            onPress={() => openWebUrl(url)}
            testID={`${testID}${index}${linkIndex}Link`}
            variant="external"
          />
        ))}
      </Column>
    ) : null,
  )
}

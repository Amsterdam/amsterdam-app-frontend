import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {Column} from '@/components/ui/layout/Column'
import {HtmlContent} from '@/components/ui/text/HtmlContent'
import {Title} from '@/components/ui/text/Title'
import {type TestProps} from '@/components/ui/types'
import {ProjectSection} from '@/modules/construction-work/types/api'

type Props = {
  sections: ProjectSection[]
} & TestProps

export const ProjectContentSections = ({sections, testID}: Props) =>
  sections.map(({body, links, title}, index) =>
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
        <HtmlContent
          content={body}
          testID={`${testID}${index}Html`}
        />
        <Column halign="start">
          {links?.map(({url, label}, linkIndex) => (
            <ExternalLinkButton
              key={label}
              label={label}
              noPaddingHorizontal
              testID={`${testID}${index}${linkIndex}ExternalLinkButton`}
              url={url}
              variant="tertiary"
            />
          ))}
        </Column>
      </Column>
    ) : null,
  )

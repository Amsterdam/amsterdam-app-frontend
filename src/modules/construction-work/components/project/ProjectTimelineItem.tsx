import {useState, Fragment} from 'react'
import {Accordion} from '@/components/ui/containers/Accordion'
import {ProgressStep} from '@/components/ui/progressSteps/ProgressStep'
import {ProgressStatus} from '@/components/ui/progressSteps/types'
import {HtmlContent} from '@/components/ui/text/HtmlContent'
import {Title} from '@/components/ui/text/Title'
import {ProjectTimelineItem as ProjectTimelineItemType} from '@/modules/construction-work/types/api'

type Props = {
  item: ProjectTimelineItemType
  progressStatusNextItem?: ProgressStatus
}

export const ProjectTimelineItem = ({item, progressStatusNextItem}: Props) => {
  const [isExpanded, setIsExpanded] = useState(!item.collapsed)

  return (
    <ProgressStep
      isExpanded={isExpanded}
      progressStatus={item.progress}
      progressStatusNextItem={progressStatusNextItem}
      testID="ConstructionWorkProjectTimelineItem"
      variant="primary">
      <Accordion
        grow={1}
        initiallyExpanded={!item.collapsed}
        isExpandable={!!item.body || !!item.items?.length}
        key={item.title}
        onChangeExpanded={state => setIsExpanded(state)}
        shrink={1}
        testID="ConstructionWorkProjectTimelineItemAccordion"
        title={item.title}>
        {!!item.body && (
          <HtmlContent
            content={item.body}
            testID="ConstructionWorkProjectTimelineItemAccordionBodyHtmlContent"
          />
        )}
        {item.items?.map(({title, body}) => (
          <Fragment key={title}>
            {!!title && (
              <Title
                level="h5"
                text={title}
              />
            )}
            {!!body && (
              <HtmlContent
                content={body}
                testID="ConstructionWorkProjectTimelineItemAccordionBodyHtmlContent"
              />
            )}
          </Fragment>
        ))}
      </Accordion>
    </ProgressStep>
  )
}

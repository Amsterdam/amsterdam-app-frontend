import {type NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Timeline} from '@/components/ui/containers/Timeline'
import {Column} from '@/components/ui/layout/Column'
import {HtmlContent} from '@/components/ui/text/HtmlContent'
import {useSetScreenTitle} from '@/hooks/navigation/useSetScreenTitle'
import {ProjectContacts} from '@/modules/construction-work/components/project/ProjectContacts'
import {ProjectContentSections} from '@/modules/construction-work/components/project/ProjectContentSections'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'

type Props = NavigationProps<ConstructionWorkRouteName.projectSegment>

export const ProjectSegmentScreen = ({route}: Props) => {
  const {
    body: {contacts, sections, timeline},
  } = route.params

  useSetScreenTitle()

  return (
    <Screen testID="ConstructionWorkProjectSegmentScreen">
      <Column gutter="md">
        <Box>
          <Column gutter="md">
            {!!contacts && <ProjectContacts contacts={contacts} />}
            {!!sections && (
              <ProjectContentSections
                sections={sections}
                testID="ConstructionWorkProjectSections"
              />
            )}
            {!!timeline?.intro && (
              <HtmlContent
                content={timeline.intro}
                testID="ConstructionWorkProjectIntro"
              />
            )}
            {timeline?.items && timeline?.items?.length > 0 && (
              <Timeline
                items={timeline.items}
                testID="ConstructionWorkProjectTimeline"
              />
            )}
          </Column>
        </Box>
      </Column>
    </Screen>
  )
}

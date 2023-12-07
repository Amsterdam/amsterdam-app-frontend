import {useLayoutEffect} from 'react'
import {NavigationProps} from '@/app/navigation/types'
import {Box} from '@/components/ui/containers/Box'
import {Timeline} from '@/components/ui/containers/Timeline'
import {Column} from '@/components/ui/layout/Column'
import {Screen} from '@/components/ui/layout/Screen'
import {HtmlContent} from '@/components/ui/text/HtmlContent'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ProjectContacts} from '@/modules/construction-work/components/project/ProjectContacts'
import {ProjectContentSections} from '@/modules/construction-work/components/project/ProjectContentSections'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'

type Props = NavigationProps<ConstructionWorkRouteName.projectSegment>

export const ProjectSegmentScreen = ({route}: Props) => {
  const {
    body: {contacts, sections, timeline, title},
    headerTitle,
  } = route.params
  const navigation = useNavigation<ConstructionWorkRouteName>()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle,
    })
  })

  return (
    <Screen>
      <Column gutter="md">
        <Box>
          <Column gutter="md">
            <Title text={title} />
            {!!contacts && <ProjectContacts contacts={contacts} />}
            {!!sections && <ProjectContentSections sections={sections} />}
            {!!timeline?.intro && <HtmlContent content={timeline.intro} />}
            {timeline?.items && timeline?.items?.length > 0 && (
              <Timeline items={timeline.items} />
            )}
          </Column>
        </Box>
      </Column>
    </Screen>
  )
}

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

type Props = NavigationProps<ConstructionWorkRouteName.projectBody>

export const ProjectBodyScreen = ({route}: Props) => {
  const {body, headerTitle} = route.params
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
            <Title text={body.title} />
            {!!body.contacts && <ProjectContacts contacts={body.contacts} />}
            {!!body.sections && (
              <ProjectContentSections sections={body.sections} />
            )}
            {body.timeline?.intro && (
              <HtmlContent content={body.timeline.intro.html} />
            )}
            {body.timeline?.items?.length && (
              <Timeline items={body.timeline.items} />
            )}
          </Column>
        </Box>
      </Column>
    </Screen>
  )
}

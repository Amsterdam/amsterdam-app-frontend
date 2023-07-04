import {useNavigation} from '@react-navigation/native'
import {useEffect, useLayoutEffect} from 'react'
import {Box, HorizontalSafeArea} from '@/components/ui/containers'
import {PleaseWait} from '@/components/ui/feedback'
import {Column} from '@/components/ui/layout'
import {FigureWithFacadesBackground, Image} from '@/components/ui/media'
import {Paragraph, Title} from '@/components/ui/text'
import {ProjectWarningFallbackImage} from '@/modules/construction-work/assets/images'
import {ProjectContacts} from '@/modules/construction-work/components/project'
import {useMarkArticleAsRead} from '@/modules/construction-work/hooks'
import {
  useGetProjectQuery,
  useGetProjectWarningQuery,
} from '@/modules/construction-work/service'
import {getProjectWarningMainImageInfo} from '@/modules/construction-work/utils/getProjectWarningMainImageInfo'
import {useTheme} from '@/themes'
import {formatDate} from '@/utils'

type Props = {
  id: string
  projectId?: string
}

export const ProjectWarning = ({id, projectId}: Props) => {
  const navigation = useNavigation()
  const {media} = useTheme()

  const {markAsRead} = useMarkArticleAsRead()

  const {data: projectWarning, isLoading: projectWarningIsLoading} =
    useGetProjectWarningQuery({id})

  const {data: project, isLoading: projectIsLoading} = useGetProjectQuery(
    {
      id: projectId ?? projectWarning?.project_identifier ?? '',
    },
    {skip: !projectId && !projectWarning},
  )

  useEffect(() => {
    if (!projectWarning) {
      return
    }

    markAsRead({
      id: projectWarning.identifier,
      publicationDate: projectWarning.publication_date,
    })
  }, [markAsRead, projectWarning])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: project?.title ?? '',
    })
  })

  if (projectWarningIsLoading || projectIsLoading || !projectWarning) {
    return <PleaseWait />
  }

  const mainImage = getProjectWarningMainImageInfo(projectWarning)

  return (
    <>
      {mainImage ? (
        <Image
          accessibilityLabel={mainImage.description}
          accessible
          source={mainImage.sources}
          testID={`ConstructionWorkProjectArticle${projectWarning.identifier}Image`}
        />
      ) : (
        <FigureWithFacadesBackground
          height={media.figureHeight.md}
          Image={<ProjectWarningFallbackImage />}
          imageAspectRatio={media.aspectRatio.extraWide}
          testID={`ConstructionWorkProjectArticle${projectWarning.identifier}Image`}
        />
      )}
      <HorizontalSafeArea>
        <Box>
          <Column gutter="md">
            <Paragraph
              testID={`ConstructionWorkProjectArticle${projectWarning.identifier}Date`}>
              {formatDate(projectWarning.publication_date)}
            </Paragraph>
            <Title
              testID={`ConstructionWorkProjectArticle${projectWarning.identifier}Title`}
              text={projectWarning.title}
            />
            <Paragraph
              testID={`ConstructionWorkProjectArticle${projectWarning.identifier}Body`}>
              {projectWarning.body}
            </Paragraph>
          </Column>
        </Box>
        {project?.contacts && (
          <Box>
            <ProjectContacts contacts={project.contacts} />
          </Box>
        )}
      </HorizontalSafeArea>
    </>
  )
}

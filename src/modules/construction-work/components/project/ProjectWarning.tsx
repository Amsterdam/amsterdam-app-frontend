import {useEffect, useLayoutEffect} from 'react'
import {Box} from '@/components/ui/containers/Box'
import {HorizontalSafeArea} from '@/components/ui/containers/HorizontalSafeArea'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Column} from '@/components/ui/layout/Column'
import {FigureWithFacadesBackground} from '@/components/ui/media/FigureWithFacadesBackground'
import {Image} from '@/components/ui/media/Image'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ProjectWarningFallbackImage} from '@/modules/construction-work/assets/images'
import {ProjectContacts} from '@/modules/construction-work/components/project/ProjectContacts'
import {useMarkArticleAsRead} from '@/modules/construction-work/hooks/useMarkArticleAsRead'
import {
  useGetProjectQuery,
  useGetProjectWarningQuery,
} from '@/modules/construction-work/service'
import {getProjectWarningMainImageInfo} from '@/modules/construction-work/utils/getProjectWarningMainImageInfo'
import {useTheme} from '@/themes/useTheme'
import {formatDate} from '@/utils/datetime/formatDate'

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
    {skip: !projectId && !projectWarning?.project_identifier},
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

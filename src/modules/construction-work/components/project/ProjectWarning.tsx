import {useNavigation} from '@react-navigation/native'
import {useEffect, useLayoutEffect, useState} from 'react'
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
import {ProjectWarningImage} from '@/modules/construction-work/types'
import {useEnvironment} from '@/store'
import {useTheme} from '@/themes'
import {formatDate, mapWarningImageSources} from '@/utils'

type Props = {
  id: string
}

export const ProjectWarning = ({id}: Props) => {
  const navigation = useNavigation()
  const {media} = useTheme()

  const [mainImage, setMainImage] = useState<ProjectWarningImage | undefined>(
    undefined,
  )
  const {markAsRead} = useMarkArticleAsRead()

  const {data: projectWarning, isLoading: projectWarningIsLoading} =
    useGetProjectWarningQuery({id})

  const {data: project, isLoading: projectIsLoading} = useGetProjectQuery(
    {
      id: projectWarning?.project_identifier ?? '',
    },
    {skip: !projectWarning},
  )

  useEffect(() => {
    const mainImageFromProjectWarning = projectWarning?.images?.find(
      image => image.main,
    )
    mainImageFromProjectWarning && setMainImage(mainImageFromProjectWarning)
  }, [projectWarning])

  useEffect(() => {
    projectWarning &&
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

  const environment = useEnvironment()

  if (projectWarningIsLoading || projectIsLoading || !projectWarning) {
    return <PleaseWait />
  }

  return (
    <>
      {mainImage ? (
        <Image
          accessibilityLabel={mainImage.description}
          accessible
          source={mapWarningImageSources(mainImage.sources, environment)}
          testID={`ConstructionWorkProjectArticle${projectWarning.identifier}Image`}
        />
      ) : (
        <FigureWithFacadesBackground
          height={media.figureHeight.md}
          Image={<ProjectWarningFallbackImage />}
          imageAspectRatio={media.aspectRatio.wide}
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

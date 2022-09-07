import {useNavigation} from '@react-navigation/native'
import React, {useEffect, useLayoutEffect, useState} from 'react'
import {Box, Hero} from '@/components/ui'
import {PleaseWait} from '@/components/ui/feedback'
import {Column} from '@/components/ui/layout'
import {Image} from '@/components/ui/media'
import {Paragraph, Title} from '@/components/ui/text'
import {ProjectContacts} from '@/modules/construction-work/components/project/ProjectContacts'
import {useMarkArticleAsRead} from '@/modules/construction-work/hooks/useMarkArticleAsRead'
import {
  useGetProjectQuery,
  useGetProjectWarningQuery,
} from '@/modules/construction-work/service'
import {ProjectWarningImage} from '@/modules/construction-work/types'
import {useEnvironment} from '@/store'
import {formatDate, mapWarningImageSources} from '@/utils'

type Props = {
  id: string
}

export const ProjectWarning = ({id}: Props) => {
  const navigation = useNavigation()
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
          accessible
          accessibilityLabel={mainImage.description}
          source={mapWarningImageSources(mainImage.sources, environment)}
        />
      ) : (
        <Hero />
      )}
      <Box>
        <Column gutter="md">
          <Paragraph>{formatDate(projectWarning.publication_date)}</Paragraph>
          <Title text={projectWarning.title} />
          <Paragraph>{projectWarning.body}</Paragraph>
        </Column>
      </Box>
      {project?.contacts && (
        <Box>
          <ProjectContacts contacts={project.contacts} />
        </Box>
      )}
    </>
  )
}

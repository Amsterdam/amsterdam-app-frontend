import {useNavigation} from '@react-navigation/native'
import React, {useEffect, useLayoutEffect, useState} from 'react'
import {View} from 'react-native'
import {useMarkArticleIdAsRead} from '../../../../components/features/notifications'
import {Box, NonScalingHeaderTitle, PleaseWait} from '../../../../components/ui'
import {Hero} from '../../../../components/ui/Hero'
import {Column, ScrollView} from '../../../../components/ui/layout'
import {Image} from '../../../../components/ui/media'
import {Paragraph, Title} from '../../../../components/ui/typography'
import {useEnvironment} from '../../../../store'
import {ProjectWarningImage} from '../../../../types'
import {formatDate, mapWarningImageSources} from '../../../../utils'
import {
  useGetProjectQuery,
  useGetProjectWarningQuery,
} from '../../projects.service'
import {ProjectContacts} from './ProjectContacts'

type Props = {
  id: string
}

export const ProjectWarning = ({id}: Props) => {
  const navigation = useNavigation()
  const [mainImage, setMainImage] = useState<ProjectWarningImage | undefined>(
    undefined,
  )

  console.log(mainImage)

  const {data: projectWarning, isLoading: projectWarningIsLoading} =
    useGetProjectWarningQuery({id})

  useMarkArticleIdAsRead(projectWarning?.identifier)

  const {data: project, isLoading: projectIsLoading} = useGetProjectQuery(
    {
      id: projectWarning?.project_identifier!,
    },
    {skip: !projectWarning},
  )

  useEffect(() => {
    const mainImageFromProjectWarning = projectWarning?.images?.find(
      image => image.main,
    )
    mainImageFromProjectWarning && setMainImage(mainImageFromProjectWarning)
  }, [projectWarning])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <NonScalingHeaderTitle text={project?.title ?? ''} />,
    })
  })

  const environment = useEnvironment()

  if (projectWarningIsLoading || projectIsLoading || !projectWarning) {
    return <PleaseWait />
  }

  return (
    <ScrollView>
      <View>
        {mainImage ? (
          <Image
            accessible
            accessibilityLabel={mainImage.description}
            source={mapWarningImageSources(mainImage.sources, environment)}
          />
        ) : (
          <Hero />
        )}
      </View>
      <Box background="white">
        <Column gutter="md">
          <Paragraph>{formatDate(projectWarning.publication_date)}</Paragraph>
          <Title text={projectWarning.title} />
          <Paragraph variant="intro">{projectWarning.body.preface}</Paragraph>
          <Paragraph>{projectWarning.body.content}</Paragraph>
        </Column>
      </Box>
      {project?.contacts && (
        <Box>
          <ProjectContacts contacts={project.contacts} />
        </Box>
      )}
    </ScrollView>
  )
}

import {useNavigation} from '@react-navigation/native'
import React, {useLayoutEffect} from 'react'
import {ScrollView} from 'react-native-gesture-handler'
import {useMarkArticleIdAsRead} from '../../../../components/features/notifications'
import {Box, PleaseWait} from '../../../../components/ui'
import {Column} from '../../../../components/ui/layout'
import {Image} from '../../../../components/ui/media'
import {Article, Paragraph, Title} from '../../../../components/ui/typography'
import {useEnvironment} from '../../../../store'
import {formatDate, mapImageSources} from '../../../../utils'
import {
  useGetProjectNewsQuery,
  useGetProjectQuery,
} from '../../projects.service'

type Props = {
  id: string
}

export const ProjectNews = ({id}: Props) => {
  const navigation = useNavigation()

  const {data: news, isLoading: newsIsLoading} = useGetProjectNewsQuery({
    id,
  })

  useMarkArticleIdAsRead(news?.identifier)

  const {data: project, isLoading: projectIsLoading} = useGetProjectQuery(
    {
      id: news?.project_identifier!,
    },
    {skip: !news},
  )

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: project?.title ?? '',
    })
  })

  const environment = useEnvironment()

  if (newsIsLoading || projectIsLoading || !news) {
    return <PleaseWait />
  }

  return (
    <ScrollView>
      {news?.images?.length && (
        <Image
          aspectRatio="wide"
          source={mapImageSources(news.images[0].sources, environment)}
        />
      )}
      {news && (
        <Box>
          <Column gutter="md">
            <Paragraph>{formatDate(news.publication_date)}</Paragraph>
            <Title text={news.title} />
            <Article content={news.body?.preface.html} isIntro />
            <Article content={news.body?.content.html} />
          </Column>
        </Box>
      )}
    </ScrollView>
  )
}

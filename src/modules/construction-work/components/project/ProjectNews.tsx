import {useNavigation} from '@react-navigation/native'
import React, {useEffect, useLayoutEffect} from 'react'
import {Box, PleaseWait} from '@/components/ui'
import {Column} from '@/components/ui/layout'
import {Image} from '@/components/ui/media'
import {Article, Paragraph, Title} from '@/components/ui/text'
import {
  useGetProjectNewsQuery,
  useGetProjectQuery,
} from '@/modules/construction-work/construction-work.service'
import {useMarkArticleAsRead} from '@/modules/construction-work/hooks/useMarkArticleAsRead'
import {useEnvironment} from '@/store'
import {formatDate, mapImageSources} from '@/utils'

type Props = {
  id: string
}

export const ProjectNews = ({id}: Props) => {
  const navigation = useNavigation()
  const {markAsRead} = useMarkArticleAsRead()

  const {data: news, isLoading: newsIsLoading} = useGetProjectNewsQuery({
    id,
  })

  const {data: project, isLoading: projectIsLoading} = useGetProjectQuery(
    {
      id: news?.project_identifier ?? '',
    },
    {skip: !news},
  )

  useEffect(() => {
    news &&
      markAsRead({
        id: news.identifier,
        publicationDate: news.publication_date,
      })
  }, [markAsRead, news])

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
    <>
      {news?.images?.length ? (
        <Image
          aspectRatio="wide"
          source={mapImageSources(news.images[0].sources, environment)}
        />
      ) : null}
      {!!news && (
        <Box>
          <Column gutter="md">
            <Paragraph>{formatDate(news.publication_date)}</Paragraph>
            <Title text={news.title} />
            <Article content={news.body?.preface.html} isIntro />
            <Article content={news.body?.content.html} />
          </Column>
        </Box>
      )}
    </>
  )
}

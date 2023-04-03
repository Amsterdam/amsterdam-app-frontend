import {useNavigation} from '@react-navigation/native'
import {useEffect, useLayoutEffect} from 'react'
import {Box, HorizontalSafeArea} from '@/components/ui/containers'
import {PleaseWait} from '@/components/ui/feedback'
import {Column} from '@/components/ui/layout'
import {Image} from '@/components/ui/media'
import {RenderHtml, Paragraph, Title} from '@/components/ui/text'
import {useMarkArticleAsRead} from '@/modules/construction-work/hooks'
import {
  useGetProjectNewsQuery,
  useGetProjectQuery,
} from '@/modules/construction-work/service'
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
          testID={`ConstructionWorkProjectArticle${news.identifier}Image`}
        />
      ) : null}
      {!!news && (
        <HorizontalSafeArea>
          <Box>
            <Column gutter="md">
              <Paragraph
                testID={`ConstructionWorkProjectArticle${news.identifier}Date`}>
                {formatDate(news.publication_date)}
              </Paragraph>
              <Title
                testID={`ConstructionWorkProjectArticle${news.identifier}Title`}
                text={news.title}
              />
              <RenderHtml
                content={news.body?.preface.html}
                isIntro
                testID={`ConstructionWorkProjectArticle${news.identifier}Intro`}
              />
              <RenderHtml
                content={news.body?.content.html}
                testID={`ConstructionWorkProjectArticle${news.identifier}Body`}
              />
            </Column>
          </Box>
        </HorizontalSafeArea>
      )}
    </>
  )
}

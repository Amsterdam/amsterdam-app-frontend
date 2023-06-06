import {useNavigation} from '@react-navigation/native'
import {useEffect, useLayoutEffect} from 'react'
import {Box, HorizontalSafeArea} from '@/components/ui/containers'
import {PleaseWait} from '@/components/ui/feedback'
import {Column} from '@/components/ui/layout'
import {Image} from '@/components/ui/media'
import {HtmlContent, Paragraph, Title} from '@/components/ui/text'
import {useMarkArticleAsRead} from '@/modules/construction-work/hooks'
import {
  useGetProjectNewsQuery,
  useGetProjectQuery,
} from '@/modules/construction-work/service'
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

  if (newsIsLoading || projectIsLoading || !news) {
    return <PleaseWait />
  }

  return (
    <>
      {!!news?.images?.length && (
        <Image
          aspectRatio="wide"
          source={mapImageSources(news.images[0].sources)}
          testID={`ConstructionWorkProjectArticle${news.identifier}Image`}
        />
      )}
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
              <HtmlContent
                content={news.body?.preface.html}
                isIntro
                testID={`ConstructionWorkProjectArticle${news.identifier}Intro`}
              />
              <HtmlContent
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

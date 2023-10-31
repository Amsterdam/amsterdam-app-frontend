import {useEffect, useLayoutEffect} from 'react'
import {Box} from '@/components/ui/containers/Box'
import {HorizontalSafeArea} from '@/components/ui/containers/HorizontalSafeArea'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Column} from '@/components/ui/layout/Column'
import {Image} from '@/components/ui/media/Image'
import {HtmlContent} from '@/components/ui/text/HtmlContent'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useMarkArticleAsRead} from '@/modules/construction-work/hooks/useMarkArticleAsRead'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {
  useGetProjectNewsQuery,
  useGetProjectQuery,
} from '@/modules/construction-work/service'
import {formatDate} from '@/utils/datetime/formatDate'
import {mapImageSources} from '@/utils/image/mapImageSources'

type Props = {
  id: string
  projectId?: string
}

export const ProjectNews = ({id, projectId}: Props) => {
  const navigation = useNavigation<ConstructionWorkRouteName>()
  const {markAsRead} = useMarkArticleAsRead()

  const {data: news, isLoading: newsIsLoading} = useGetProjectNewsQuery({
    id,
  })

  const {data: project, isLoading: projectIsLoading} = useGetProjectQuery(
    {
      id: projectId ?? news?.project_identifier ?? '',
    },
    {skip: !projectId && !news?.project_identifier},
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
          source={mapImageSources(news.images[0]?.sources)}
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

import {useNavigation} from '@react-navigation/native'
import React, {useLayoutEffect} from 'react'
import {ScrollView} from 'react-native-gesture-handler'
import {useMarkArticleIdAsRead} from '../../../../components/features/notifications'
import {Box, NonScalingHeaderTitle, PleaseWait} from '../../../../components/ui'
import {Column} from '../../../../components/ui/layout'
import {Image} from '../../../../components/ui/media'
import {Paragraph, Title} from '../../../../components/ui/typography'
import {Article} from '../../../../components/ui/typography/Article'
import {useEnvironment} from '../../../../store'
import {tagsStyles, tagsStylesIntro} from '../../../../styles/html'
import {font} from '../../../../tokens'
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
      headerTitle: () => <NonScalingHeaderTitle text={project?.title ?? ''} />,
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
            {news.body?.preface.html && (
              <Article
                source={{html: news.body?.preface.html}}
                systemFonts={[font.weight.regular, font.weight.demi]}
                tagsStyles={tagsStylesIntro}
              />
            )}
            {news.body?.content.html && (
              <Article
                source={{html: news.body?.content.html}}
                systemFonts={[font.weight.regular, font.weight.demi]}
                tagsStyles={tagsStyles}
              />
            )}
          </Column>
        </Box>
      )}
    </ScrollView>
  )
}

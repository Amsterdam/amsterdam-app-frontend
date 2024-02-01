import {skipToken} from '@reduxjs/toolkit/dist/query'
import {useEffect, useLayoutEffect} from 'react'
import {ConstructionWorkDetailFigure} from '@/assets/images/errors/ConstructionWorkDetailFigure'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {ErrorScreen} from '@/components/ui/layout/ErrorScreen'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ProjectArticle} from '@/modules/construction-work/components/project/ProjectArticle'
import {useMarkArticleAsRead} from '@/modules/construction-work/hooks/useMarkArticleAsRead'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {
  useProjectNewsQuery,
  useProjectDetailsQuery,
} from '@/modules/construction-work/service'
import {getUniqueArticleId} from '@/modules/construction-work/utils/getUniqueArticleId'

type Props = {
  id: number
  projectId?: number
}

export const ProjectNews = ({id, projectId}: Props) => {
  const navigation = useNavigation<ConstructionWorkRouteName>()
  const {markAsRead} = useMarkArticleAsRead()

  const {
    data: article,
    isError: articleIsError,
    isLoading: articleIsLoading,
  } = useProjectNewsQuery({
    id,
  })

  // If we come here via a deeplink, we don't have the projectId. Then we fetch the article first and use an ID from the response.
  // Note that the article has an array of project IDs, because there is a many-to-many relation between news articles and projects. We assume the first ID is the correct one.
  const pId = projectId ?? article?.projects?.[0]

  const {data: project, isLoading: projectIsLoading} = useProjectDetailsQuery(
    pId !== undefined
      ? {
          id: pId,
        }
      : skipToken,
  )

  useEffect(() => {
    if (!article) {
      return
    }

    markAsRead({
      id: getUniqueArticleId({id, type: 'article'}),
      publicationDate: article.publication_date,
    })
  }, [article, id, markAsRead])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: project?.title ?? 'Project nieuws',
    })
  })

  if (articleIsLoading || projectIsLoading) {
    return <PleaseWait />
  }

  if (!article || articleIsError) {
    return (
      <ErrorScreen
        buttonAccessibilityLabel="Terug naar werkzaamheid"
        buttonLabel="Terug naar werkzaamheid"
        Image={ConstructionWorkDetailFigure}
        noBackgroundFacade
        onPress={() =>
          navigation.navigate(ConstructionWorkRouteName.project, {id})
        }
        testId="ProjectDetailErrorScreen"
        text="Ga terug naar de werkzaamheid."
        title="Helaas is het nieuwsartikel niet gevonden worden..."
      />
    )
  }

  const {body, image, intro, publication_date, title} = article

  return (
    <ProjectArticle
      body={body}
      id={id}
      image={image}
      intro={intro}
      publicationDate={publication_date}
      title={title ?? ''}
    />
  )
}

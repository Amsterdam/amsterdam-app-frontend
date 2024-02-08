import {skipToken} from '@reduxjs/toolkit/dist/query'
import {useEffect} from 'react'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {FullScreenError} from '@/components/ui/layout/FullScreenError'
import {ConstructionWorkDetailFigure} from '@/components/ui/media/errors/ConstructionWorkDetailFigure'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useSetScreenTitle} from '@/hooks/navigation/useSetScreenTitle'
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
  const navigation = useNavigation()
  const {markAsRead} = useMarkArticleAsRead()

  const {
    data: article,
    isError: articleIsError,
    isLoading: articleIsLoading,
    error: articleError,
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

  const projectTitle = useSetScreenTitle(project?.title)

  if (articleIsLoading || projectIsLoading) {
    return <PleaseWait />
  }

  if (!article || articleIsError) {
    return (
      <FullScreenError
        backgroundVisible={false}
        buttonLabel="Terug naar project"
        error={articleError}
        Image={ConstructionWorkDetailFigure}
        onPress={() =>
          navigation.navigate(ConstructionWorkRouteName.project, {
            id,
            screenHeaderTitle: projectTitle,
          })
        }
        testProps={{
          testID: 'ProjectDetailErrorScreen',
        }}
        text="Ga terug naar het project."
        title="Helaas is het project niet gevonden"
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

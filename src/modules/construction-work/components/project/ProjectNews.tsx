import {skipToken} from '@reduxjs/toolkit/dist/query'
import {useEffect, useLayoutEffect} from 'react'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
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

  const {data: article, isLoading: articleIsLoading} = useProjectNewsQuery({
    id,
  })

  // @TODO: wtf
  // const {data: project, isLoading: projectIsLoading} = useProjectDetailsQuery(
  //   {
  //     id: projectId ?? news?.project_identifier ?? '',
  //   },
  //   {skip: !projectId && !news?.project_identifier},
  // )

  const {data: project, isLoading: projectIsLoading} = useProjectDetailsQuery(
    projectId !== undefined
      ? {
          id: projectId,
        }
      : skipToken,
  )

  useEffect(() => {
    if (!article) {
      return
    }

    markAsRead({
      id: getUniqueArticleId({meta_id: {id, type: 'article'}}),
      publicationDate: article.publication_date,
    })
  }, [article, id, markAsRead])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: project?.title ?? '',
    })
  })

  if (articleIsLoading || projectIsLoading || !article) {
    return <PleaseWait />
  }

  if (!article) {
    return <SomethingWentWrong />
  }

  return <ProjectArticle article={article} />
}

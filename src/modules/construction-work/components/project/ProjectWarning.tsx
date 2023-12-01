import {skipToken} from '@reduxjs/toolkit/dist/query'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {ProjectArticle} from '@/modules/construction-work/components/project/ProjectArticle'
import {ProjectContacts} from '@/modules/construction-work/components/project/ProjectContacts'
import {
  useProjectDetailsQuery,
  useProjectWarningQuery,
} from '@/modules/construction-work/service'

type Props = {
  id: number
  projectId?: number
}

export const ProjectWarning = ({id, projectId}: Props) => {
  const {data: article, isLoading: articleIsLoading} = useProjectWarningQuery({
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

  if (articleIsLoading || projectIsLoading) {
    return <PleaseWait />
  }

  if (!article) {
    return <SomethingWentWrong />
  }

  return (
    <ProjectArticle
      article={article}
      type="warning">
      {project?.contacts && (
        <Box>
          <ProjectContacts contacts={project.contacts} />
        </Box>
      )}
    </ProjectArticle>
  )
}

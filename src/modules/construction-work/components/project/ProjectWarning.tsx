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

type ProjectWarningContactsProps = {
  projectId?: number | null
}

const ProjectWarningContacts = ({projectId}: ProjectWarningContactsProps) => {
  const {data, isLoading} = useProjectDetailsQuery(
    projectId
      ? {
          id: projectId,
        }
      : skipToken,
  )

  if (isLoading) {
    return <PleaseWait />
  }

  if (!data?.contacts) {
    return null
  }

  return (
    <Box>
      <ProjectContacts contacts={data.contacts} />
    </Box>
  )
}

type Props = {
  id: number
  projectId?: number
}

export const ProjectWarning = ({id, projectId}: Props) => {
  const {data, isLoading} = useProjectWarningQuery({
    id,
  })

  if (isLoading) {
    return <PleaseWait />
  }

  if (!data) {
    return <SomethingWentWrong />
  }

  const {body, images, publication_date, title} = data

  return (
    <ProjectArticle
      body={body}
      id={id}
      image={images?.[0]}
      publicationDate={publication_date}
      title={title}
      type="warning">
      <ProjectWarningContacts projectId={projectId ?? data?.project_id} />
    </ProjectArticle>
  )
}

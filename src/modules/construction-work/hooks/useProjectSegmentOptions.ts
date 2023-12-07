import {useMemo} from 'react'
import {Project, ProjectSection} from '@/modules/construction-work/types/api'
import {ProjectSegment} from '@/modules/construction-work/types/project'
import {isEmptyObject} from '@/utils/object'

export enum ProjectSegmentTitle {
  about = 'Over dit project',
  contact = 'Contact',
  planning = 'Planning',
  work = 'Werkzaamheden',
}

export const hasContentToShow = (
  section?: ProjectSection[] | null,
): section is ProjectSection[] =>
  !!section?.length && section.some(({body}) => !!body)

export const getProjectSegmentOptions = ({
  contacts,
  sections,
  timeline,
}: Project) => {
  const options: ProjectSegment[] = []
  const {contact, what, when, where, work} = sections ?? {}

  if (hasContentToShow(what) || hasContentToShow(where)) {
    options.push({
      sections: [...(what ?? []), ...(where ?? [])],
      testID: 'ConstructionWorkProjectAboutButton',
      title: ProjectSegmentTitle.about,
    })
  }

  if (hasContentToShow(when) || (timeline && !isEmptyObject(timeline))) {
    options.push({
      sections: when,
      timeline: timeline,
      testID: 'ConstructionWorkProjectPlanningButton',
      title: ProjectSegmentTitle.planning,
    })
  }

  if (hasContentToShow(work)) {
    options.push({
      sections: work,
      testID: 'ConstructionWorkProjectWorkButton',
      title: ProjectSegmentTitle.work,
    })
  }

  if (hasContentToShow(contact) || contacts?.length) {
    options.push({
      sections: contact,
      contacts: contacts,
      testID: 'ConstructionWorkProjectContactButton',
      title: ProjectSegmentTitle.contact,
    })
  }

  return options
}

export const useProjectSegmentOptions = (project: Project) =>
  useMemo(() => getProjectSegmentOptions(project), [project])

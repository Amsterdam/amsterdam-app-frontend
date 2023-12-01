import {useMemo} from 'react'
import {
  ProjectDetail,
  ProjectDetailSection,
} from '@/modules/construction-work/types/api'
import {ProjectDetailSubScreen} from '@/modules/construction-work/types/project'
import {isEmptyObject} from '@/utils/object'

export enum ProjectDetailSubScreenTitle {
  about = 'Over dit project',
  contact = 'Contact',
  planning = 'Planning',
  work = 'Werkzaamheden',
}

export const hasContentToShow = (sections: ProjectDetailSection[]) =>
  !!sections.length && sections.some(({body}) => !!body)

export const getProjectDetailSubScreenOptions = ({
  contacts,
  sections: {contact, what, when, where, work},
  timeline,
}: ProjectDetail) => {
  const options: ProjectDetailSubScreen[] = []

  if (hasContentToShow(what) || hasContentToShow(where)) {
    options.push({
      sections: [...what, ...where],
      testID: 'ConstructionWorkProjectAboutButton',
      title: ProjectDetailSubScreenTitle.about,
    })
  }

  if (hasContentToShow(when) || (timeline && !isEmptyObject(timeline))) {
    options.push({
      sections: when,
      timeline: timeline,
      testID: 'ConstructionWorkProjectPlanningButton',
      title: ProjectDetailSubScreenTitle.planning,
    })
  }

  if (hasContentToShow(work)) {
    options.push({
      sections: work,
      testID: 'ConstructionWorkProjectWorkButton',
      title: ProjectDetailSubScreenTitle.work,
    })
  }

  if (hasContentToShow(contact) || contacts.length) {
    options.push({
      sections: contact,
      contacts: contacts,
      testID: 'ConstructionWorkProjectContactButton',
      title: ProjectDetailSubScreenTitle.contact,
    })
  }

  return options
}

export const useProjectDetailSubScreenOptions = (project: ProjectDetail) =>
  useMemo(() => getProjectDetailSubScreenOptions(project), [project])

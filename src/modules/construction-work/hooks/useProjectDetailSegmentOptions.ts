import {useMemo} from 'react'
import {
  ProjectDetail,
  ProjectDetailSection,
} from '@/modules/construction-work/types/api'
import {ProjectDetailSegment} from '@/modules/construction-work/types/project'
import {isEmptyObject} from '@/utils/object'

export enum ProjectDetailSegmentTitle {
  about = 'Over dit project',
  contact = 'Contact',
  planning = 'Planning',
  work = 'Werkzaamheden',
}

export const hasContentToShow = (sections: ProjectDetailSection[]) =>
  !!sections.length && sections.some(({body}) => !!body)

export const getProjectDetailSegmentOptions = ({
  contacts,
  sections: {contact, what, when, where, work},
  timeline,
}: ProjectDetail) => {
  const options: ProjectDetailSegment[] = []

  if (hasContentToShow(what) || hasContentToShow(where)) {
    options.push({
      sections: [...what, ...where],
      testID: 'ConstructionWorkProjectAboutButton',
      title: ProjectDetailSegmentTitle.about,
    })
  }

  if (hasContentToShow(when) || (timeline && !isEmptyObject(timeline))) {
    options.push({
      sections: when,
      timeline: timeline,
      testID: 'ConstructionWorkProjectPlanningButton',
      title: ProjectDetailSegmentTitle.planning,
    })
  }

  if (hasContentToShow(work)) {
    options.push({
      sections: work,
      testID: 'ConstructionWorkProjectWorkButton',
      title: ProjectDetailSegmentTitle.work,
    })
  }

  if (hasContentToShow(contact) || contacts.length) {
    options.push({
      sections: contact,
      contacts: contacts,
      testID: 'ConstructionWorkProjectContactButton',
      title: ProjectDetailSegmentTitle.contact,
    })
  }

  return options
}

export const useProjectDetailSegmentOptions = (project: ProjectDetail) =>
  useMemo(() => getProjectDetailSegmentOptions(project), [project])

import {
  ProjectSegmentTitle,
  getProjectSegmentOptions,
  hasContentToShow,
} from '@/modules/construction-work/hooks/useProjectSegmentOptions'
import {Project, ProjectSection} from '@/modules/construction-work/types/api'
import {ProjectSegment} from '@/modules/construction-work/types/project'

describe('hasContentToShow', () => {
  test('returns true when sections have content', () => {
    const sections = [{body: 'Some content', title: 'Section 1'}]
    const result = hasContentToShow(sections)

    expect(result).toBe(true)
  })

  test('returns false when sections are empty', () => {
    const sections: ProjectSection[] = []
    const result = hasContentToShow(sections)

    expect(result).toBe(false)
  })

  test('returns false when all sections have no content', () => {
    const sections = [
      {body: '', title: 'Section 1'},
      {body: null, title: 'Section 2'},
    ]
    const result = hasContentToShow(sections)

    expect(result).toBe(false)
  })
})

describe('getProjectSegmentOptions', () => {
  test('returns options for "about" section when there is content in "what"', () => {
    const project = {
      contacts: [],
      sections: {
        contact: [],
        what: [{body: 'About this project', title: 'What'}],
        when: [],
        where: [],
        work: [],
      },
      timeline: null,
    } as unknown as Project

    const result = getProjectSegmentOptions(project)

    const expectedOptions: ProjectSegment[] = [
      {
        sections: project.sections?.what,
        testID: 'ConstructionWorkProjectAboutButton',
        title: ProjectSegmentTitle.about,
      },
    ]

    expect(result).toEqual(expectedOptions)
  })

  test('returns options for "about" section when there is content in "where"', () => {
    const project = {
      contacts: [],
      sections: {
        contact: [],
        what: [],
        when: [],
        where: [{body: 'Project location', title: 'Where'}],
        work: [],
      },
      timeline: null,
    } as unknown as Project

    const result = getProjectSegmentOptions(project)

    const expectedOptions: ProjectSegment[] = [
      {
        sections: project.sections?.where,
        testID: 'ConstructionWorkProjectAboutButton',
        title: ProjectSegmentTitle.about,
      },
    ]

    expect(result).toEqual(expectedOptions)
  })

  test('does not return options for sections when there is no content', () => {
    const project = {
      contacts: [],
      sections: {
        contact: [],
        what: [],
        when: [],
        where: [],
        work: [],
      },
      timeline: null,
    } as unknown as Project

    const result = getProjectSegmentOptions(project)

    const expectedOptions: ProjectSegment[] = []

    expect(result).toEqual(expectedOptions)
  })

  test('returns options for "contact" section when there is content in "contact"', () => {
    const project = {
      contacts: [],
      sections: {
        contact: [{body: 'Contact details', title: 'Contact'}],
        what: [],
        when: [],
        where: [],
        work: [],
      },
      timeline: null,
    } as unknown as Project

    const result = getProjectSegmentOptions(project)

    const expectedOptions: ProjectSegment[] = [
      {
        sections: project.sections?.contact,
        contacts: project.contacts,
        testID: 'ConstructionWorkProjectContactButton',
        title: ProjectSegmentTitle.contact,
      },
    ]

    expect(result).toEqual(expectedOptions)
  })

  test('returns options for "contact" section when there is content in "contacts"', () => {
    const project = {
      contacts: [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          phone: '123-456-7890',
          position: 'Manager',
          address: '123 Main St',
        },
      ],
      sections: {
        contact: [],
        what: [],
        when: [],
        where: [],
        work: [],
      },
      timeline: null,
    } as unknown as Project

    const result = getProjectSegmentOptions(project)

    const expectedOptions: ProjectSegment[] = [
      {
        sections: project.sections?.contact,
        contacts: project.contacts,
        testID: 'ConstructionWorkProjectContactButton',
        title: ProjectSegmentTitle.contact,
      },
    ]

    expect(result).toEqual(expectedOptions)
  })

  test('returns options for "planning" section when there is content in "when"', () => {
    const project = {
      contacts: [],
      sections: {
        contact: [],
        what: [],
        when: [{body: 'Project timeline details', title: 'When'}],
        where: [],
        work: [],
      },
      timeline: null,
    } as unknown as Project

    const result = getProjectSegmentOptions(project)

    const expectedOptions: ProjectSegment[] = [
      {
        sections: project.sections?.when,
        timeline: null,
        testID: 'ConstructionWorkProjectPlanningButton',
        title: ProjectSegmentTitle.planning,
      },
    ]

    expect(result).toEqual(expectedOptions)
  })

  test('returns options for "planning" section when there is content in "timeline"', () => {
    const project = {
      contacts: [],
      sections: {
        contact: [],
        what: [],
        when: [],
        where: [],
        work: [],
      },
      timeline: {
        intro: 'Project timeline intro',
        items: [
          {
            body: 'Timeline item 1 details',
            collapsed: false,
            date: '2023-01-01',
            items: [],
            progress: 'Huidig',
            title: 'Timeline item 1',
          },
        ],
        title: 'Project Timeline',
      },
    } as unknown as Project

    const result = getProjectSegmentOptions(project)

    const expectedOptions: ProjectSegment[] = [
      {
        sections: [],
        timeline: project.timeline,
        testID: 'ConstructionWorkProjectPlanningButton',
        title: ProjectSegmentTitle.planning,
      },
    ]

    expect(result).toEqual(expectedOptions)
  })

  test('returns options for "work" section when there is content in "work"', () => {
    const project = {
      contacts: [],
      sections: {
        contact: [],
        what: [],
        when: [],
        where: [],
        work: [{body: 'Work details', title: 'Work'}],
      },
      timeline: null,
    } as unknown as Project

    const result = getProjectSegmentOptions(project)

    const expectedOptions: ProjectSegment[] = [
      {
        sections: project.sections?.work,
        testID: 'ConstructionWorkProjectWorkButton',
        title: ProjectSegmentTitle.work,
      },
    ]

    expect(result).toEqual(expectedOptions)
  })
})

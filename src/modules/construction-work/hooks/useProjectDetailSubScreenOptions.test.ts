import {ProjectDetail, ProjectDetailSection} from '../types/api'
import {ProjectDetailSubScreen} from '../types/project'
import {
  ProjectDetailSubScreenTitle,
  getProjectDetailSubScreenOptions,
  hasContentToShow,
} from './useProjectDetailSubScreenOptions'

describe('hasContentToShow', () => {
  test('returns true when sections have content', () => {
    const sections = [{body: 'Some content', title: 'Section 1'}]
    const result = hasContentToShow(sections)

    expect(result).toBe(true)
  })

  test('returns false when sections are empty', () => {
    const sections: ProjectDetailSection[] = []
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

describe('getProjectDetailSubScreenOptions', () => {
  test('returns options for "about" section when there is content in "what"', () => {
    const projectDetail = {
      contacts: [],
      sections: {
        contact: [],
        what: [{body: 'About this project', title: 'What'}],
        when: [],
        where: [],
        work: [],
      },
      timeline: null,
    } as unknown as ProjectDetail

    const result = getProjectDetailSubScreenOptions(projectDetail)

    const expectedOptions: ProjectDetailSubScreen[] = [
      {
        sections: [...projectDetail.sections.what],
        testID: 'ConstructionWorkProjectAboutButton',
        title: ProjectDetailSubScreenTitle.about,
      },
    ]

    expect(result).toEqual(expectedOptions)
  })

  test('returns options for "about" section when there is content in "where"', () => {
    const projectDetail = {
      contacts: [],
      sections: {
        contact: [],
        what: [],
        when: [],
        where: [{body: 'Project location', title: 'Where'}],
        work: [],
      },
      timeline: null,
    } as unknown as ProjectDetail

    const result = getProjectDetailSubScreenOptions(projectDetail)

    const expectedOptions: ProjectDetailSubScreen[] = [
      {
        sections: [...projectDetail.sections.where],
        testID: 'ConstructionWorkProjectAboutButton',
        title: ProjectDetailSubScreenTitle.about,
      },
    ]

    expect(result).toEqual(expectedOptions)
  })

  test('does not return options for sections when there is no content', () => {
    const projectDetail = {
      contacts: [],
      sections: {
        contact: [],
        what: [],
        when: [],
        where: [],
        work: [],
      },
      timeline: null,
    } as unknown as ProjectDetail

    const result = getProjectDetailSubScreenOptions(projectDetail)

    const expectedOptions: ProjectDetailSubScreen[] = []

    expect(result).toEqual(expectedOptions)
  })

  test('returns options for "contact" section when there is content in "contact"', () => {
    const projectDetail = {
      contacts: [],
      sections: {
        contact: [{body: 'Contact details', title: 'Contact'}],
        what: [],
        when: [],
        where: [],
        work: [],
      },
      timeline: null,
    } as unknown as ProjectDetail

    const result = getProjectDetailSubScreenOptions(projectDetail)

    const expectedOptions: ProjectDetailSubScreen[] = [
      {
        sections: projectDetail.sections.contact,
        contacts: projectDetail.contacts,
        testID: 'ConstructionWorkProjectContactButton',
        title: ProjectDetailSubScreenTitle.contact,
      },
    ]

    expect(result).toEqual(expectedOptions)
  })

  test('returns options for "contact" section when there is content in "contacts"', () => {
    const projectDetail = {
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
    } as unknown as ProjectDetail

    const result = getProjectDetailSubScreenOptions(projectDetail)

    const expectedOptions: ProjectDetailSubScreen[] = [
      {
        sections: projectDetail.sections.contact,
        contacts: projectDetail.contacts,
        testID: 'ConstructionWorkProjectContactButton',
        title: ProjectDetailSubScreenTitle.contact,
      },
    ]

    expect(result).toEqual(expectedOptions)
  })

  test('returns options for "planning" section when there is content in "when"', () => {
    const projectDetail = {
      contacts: [],
      sections: {
        contact: [],
        what: [],
        when: [{body: 'Project timeline details', title: 'When'}],
        where: [],
        work: [],
      },
      timeline: null,
    } as unknown as ProjectDetail

    const result = getProjectDetailSubScreenOptions(projectDetail)

    const expectedOptions: ProjectDetailSubScreen[] = [
      {
        sections: projectDetail.sections.when,
        timeline: null,
        testID: 'ConstructionWorkProjectPlanningButton',
        title: ProjectDetailSubScreenTitle.planning,
      },
    ]

    expect(result).toEqual(expectedOptions)
  })

  test('returns options for "planning" section when there is content in "timeline"', () => {
    const projectDetail = {
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
    } as unknown as ProjectDetail

    const result = getProjectDetailSubScreenOptions(projectDetail)

    const expectedOptions: ProjectDetailSubScreen[] = [
      {
        sections: [],
        timeline: projectDetail.timeline,
        testID: 'ConstructionWorkProjectPlanningButton',
        title: ProjectDetailSubScreenTitle.planning,
      },
    ]

    expect(result).toEqual(expectedOptions)
  })

  test('returns options for "work" section when there is content in "work"', () => {
    const projectDetail = {
      contacts: [],
      sections: {
        contact: [],
        what: [],
        when: [],
        where: [],
        work: [{body: 'Work details', title: 'Work'}],
      },
      timeline: null,
    } as unknown as ProjectDetail

    const result = getProjectDetailSubScreenOptions(projectDetail)

    const expectedOptions: ProjectDetailSubScreen[] = [
      {
        sections: projectDetail.sections.work,
        testID: 'ConstructionWorkProjectWorkButton',
        title: ProjectDetailSubScreenTitle.work,
      },
    ]

    expect(result).toEqual(expectedOptions)
  })
})

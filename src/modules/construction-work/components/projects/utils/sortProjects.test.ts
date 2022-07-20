import {
  compareRecentArticleDates,
  getFirstUnreadArticlePublicationDate,
  sortProjects,
} from '@/modules/construction-work/components/projects/utils/sortProjects'
import {ProjectsItem} from '@/modules/construction-work/types'

const project1 = {
  identifier: '15510fbb191ec27dc0554ed2b19fe39d',
  followed: false,
  recent_articles: [],
} as unknown as ProjectsItem

const project2 = {
  identifier: '24b3251d4818b5927e6dd295940762c7',
  followed: true,
} as unknown as ProjectsItem

const project3 = {
  identifier: 'f266860558f672da156a38eb2bc3f034',
  followed: true,
  recent_articles: [
    {
      identifier: 'ba190881ed7ae10542687d603e9adbbf',
      publication_date: '2022-05-18',
    },
  ],
} as unknown as ProjectsItem

const project4 = {
  identifier: '17a76fcfd4bdcac89fa31e065bb0dffe',
  followed: true,
  recent_articles: [
    {
      identifier: '502a4f80eba13870abfbc531be928679',
      publication_date: '2022-06-28',
    },
  ],
} as unknown as ProjectsItem

const project5 = {
  identifier: '17a76fcfd4bdcac89fa31e065bb0dfpo',
  followed: false,
  recent_articles: [
    {
      identifier: '502a4f80eba13870abfbc531be928679',
      publication_date: '2022-06-28',
    },
  ],
} as unknown as ProjectsItem

const project6 = {
  identifier: '17a76fcfd4bdcac89fa31e065bb0dfza',
  followed: true,
  recent_articles: [
    {
      identifier: '502a4f80eba13870abfbc531be928688',
      publication_date: '2022-06-29',
    },
    {
      identifier: 'ba190881ed7ae10542687d603e9adbbf',
      publication_date: '2022-06-18',
    },
  ],
} as unknown as ProjectsItem

const recent_articles = [
  {
    identifier: '502a4f80eba13870abfbc531be928688',
    publication_date: '2022-06-29',
  },
  {
    identifier: 'ba190881ed7ae10542687d603e9adbbf',
    publication_date: '2022-06-18',
  },
  {
    identifier: 'ba190881ed7ae10542687d603e9adbbe',
    publication_date: '2022-05-18',
  },
]

const readArticleIds = ['502a4f80eba13870abfbc531be928688']

describe('Get the date of the first unread article of a project', () => {
  test('when no read articles exist', () => {
    expect(
      getFirstUnreadArticlePublicationDate([])({
        recent_articles,
      } as ProjectsItem),
    ).toBe('2022-06-29')
  })
  test('when recent nor read articles exist', () => {
    expect(
      getFirstUnreadArticlePublicationDate([])({
        recent_articles: [],
      } as unknown as ProjectsItem),
    ).toBe('0')
  })
  test('when first article is read', () => {
    expect(
      getFirstUnreadArticlePublicationDate([
        '502a4f80eba13870abfbc531be928688',
      ])({
        recent_articles,
      } as ProjectsItem),
    ).toBe('2022-06-18')
  })
  test('when all articles are read', () => {
    expect(
      getFirstUnreadArticlePublicationDate([
        'ba190881ed7ae10542687d603e9adbbf',
        '502a4f80eba13870abfbc531be928688',
        'ba190881ed7ae10542687d603e9adbbe',
      ])({
        recent_articles,
      } as ProjectsItem),
    ).toBe('0')
  })
})

describe('Compare sort result of recent article dates', () => {
  test('Project with more recent article date should come before less recent', () => {
    expect(compareRecentArticleDates([])(project6, project4)).toBe(-1)
  })
  test('Except when most recent article is already read', () => {
    expect(compareRecentArticleDates(readArticleIds)(project6, project4)).toBe(
      1,
    )
  })
  test('Project with articles should come before projects without', () => {
    expect(compareRecentArticleDates([])(project4, project2)).toBe(-1)
  })
  test('The order of projects should be unchanged when no articles are present', () => {
    expect(compareRecentArticleDates([])(project1, project2)).toBe(1)
  })
})

describe('Sort projects', () => {
  test('sort followed', () => {
    expect(sortProjects([project1, project3], readArticleIds)).toEqual([
      project3,
      project1,
    ])
  })
  test('sort by publication date', () => {
    expect(
      sortProjects(
        [project1, project2, project4, project5, project6],
        readArticleIds,
      ),
    ).toEqual([project4, project6, project2, project1, project5])
  })
})

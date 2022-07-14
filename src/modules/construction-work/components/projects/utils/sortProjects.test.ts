import {sortProjects} from '@/modules/construction-work/components/projects/utils/sortProjects'
import {ProjectsItem} from '@/modules/construction-work/types'

const project1 = {
  identifier: '15510fbb191ec27dc0554ed2b19fe39d',
  images: [],
  subtitle: 'Groot onderhoud',
  title: 'Waalstraat-Lekstraat',
  followed: false,
  meter: 450,
  strides: 608,
  recent_articles: [],
} as unknown as ProjectsItem

// const project2 = {
//   identifier: '24b3251d4818b5927e6dd295940762c7',
//   images: [],
//   subtitle: 'Nieuwe inrichting',
//   title: 'Niersstraat',
//   followed: false,
//   meter: 489,
//   strides: 660,
// } as unknown as ProjectsItem

const project3 = {
  identifier: 'f266860558f672da156a38eb2bc3f034',
  images: [],
  subtitle: 'Verkeersveiliger en meer ruimte',
  title: 'Ferdinand Bolstraat Zuid',
  followed: true,
  meter: 597,
  strides: 806,
  recent_articles: [
    {
      identifier: 'ba190881ed7ae10542687d603e9adbbf',
      publication_date: '2022-05-18',
    },
  ],
} as unknown as ProjectsItem

const project4 = {
  identifier: '17a76fcfd4bdcac89fa31e065bb0dffe',
  images: [],
  subtitle: 'Groot onderhoud',
  title: 'Wielingenstraat',
  followed: true,
  meter: 708,
  strides: 956,
  recent_articles: [
    {
      identifier: '502a4f80eba13870abfbc531be928679',
      publication_date: '2022-06-28',
    },
  ],
} as unknown as ProjectsItem

// const project5 = {
//   identifier: '17a76fcfd4bdcac89fa31e065bb0dfpo',
//   images: [],
//   subtitle: 'Groot onderhoud',
//   title: 'Wielingenstraat',
//   followed: false,
//   meter: 708,
//   strides: 956,
//   recent_articles: [
//     {
//       identifier: '502a4f80eba13870abfbc531be928679',
//       publication_date: '2022-06-28',
//     },
//   ],
// } as unknown as ProjectsItem

// const project6 = {
//   identifier: '17a76fcfd4bdcac89fa31e065bb0dfza',
//   images: [],
//   subtitle: 'Groot onderhoud',
//   title: 'Wielingenstraat',
//   followed: true,
//   meter: 708,
//   strides: 956,
//   recent_articles: [
//     {
//       identifier: '502a4f80eba13870abfbc531be928679',
//       publication_date: '2022-06-29',
//     },
//     {
//       identifier: 'ba190881ed7ae10542687d603e9adbbf',
//       publication_date: '2022-06-18',
//     },
//   ],
// } as unknown as ProjectsItem

describe('Sort projects', () => {
  test('sort followed', () => {
    expect(sortProjects([project1, project3])).toEqual([project3, project1])
  })
  test('sort by publication date', () => {
    expect(sortProjects([project1, project3, project4])).toEqual([
      project4,
      project3,
      project1,
    ])
  })
})

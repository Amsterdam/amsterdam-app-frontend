import {Transaction} from '@/modules/city-pass/types'

const omschrijving = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'

export const transactions: Transaction[] = [
  {
    id: 1,
    aanbieder: {
      id: 1,
      naam: 'Over het IJ Festival',
    },
    bedrag: 104.95,
    omschrijving,
    transactiedatum: '2024-06-10T04:01:01.0000',
  },
  {
    id: 2,
    aanbieder: {
      id: 2,
      naam: 'Stedelijk Museum Amsterdam',
    },
    bedrag: 22.5,
    omschrijving,
    transactiedatum: '2024-06-10T04:01:01.0000',
  },
  {
    id: 3,
    aanbieder: {
      id: 3,
      naam: 'ARTIS',
    },
    bedrag: 29.95,
    omschrijving,
    transactiedatum: '2024-06-04T04:01:01.0000',
  },
  {
    id: 4,
    aanbieder: {
      id: 4,
      naam: 'NEMO Science Museum',
    },
    bedrag: 27.5,
    omschrijving,
    transactiedatum: '2024-05-22T04:01:01.0000',
  },
  {
    id: 5,
    aanbieder: {
      id: 5,
      naam: 'Eye Filmmuseum',
    },
    bedrag: 11.5,
    omschrijving,
    transactiedatum: '2024-05-22T04:01:01.0000',
  },
  {
    id: 6,
    aanbieder: {
      id: 2,
      naam: 'Stedelijk Museum Amsterdam',
    },
    bedrag: 22.5,
    omschrijving,
    transactiedatum: '2024-05-06T04:01:01.0000',
  },
  {
    id: 7,
    aanbieder: {
      id: 3,
      naam: 'ARTIS',
    },
    bedrag: 29.95,
    omschrijving,
    transactiedatum: '2024-02-16T04:01:01.0000',
  },
]

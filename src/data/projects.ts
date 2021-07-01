export type Project = {
  id: string
  imageSource: {
    uri: string
  }
  text: string
  title: string
}

export const projects: Project[] = [
  {
    id: '961922',
    imageSource: {
      uri: 'https://www.amsterdam.nl/publish/pages/961922/stp_marnixstraat_940.jpg',
    },
    text: 'Herinrichting kruispunt',
    title: 'Marnixstraat-Rozengracht',
  },
  {
    id: '966195',
    imageSource: {
      uri: 'https://www.amsterdam.nl/publish/pages/966195/940x415_a_programma_brug.jpg',
    },
    text: 'Vernieuwing 9 bruggen en 5 straten',
    title: 'Oranje Loper',
  },
]

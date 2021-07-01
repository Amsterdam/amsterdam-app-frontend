export type Project = {
  id: string
  imageSource: {
    uri: string
  }
  title: string
}

export const projects: Project[] = [
  {
    id: '961922',
    imageSource: {
      uri: 'https://www.amsterdam.nl/publish/pages/961922/stp_marnixstraat_940.jpg',
    },
    title: 'Marnixstraat-Rozengracht: herinrichting kruispunt',
  },
  {
    id: '966195',
    imageSource: {
      uri: 'https://www.amsterdam.nl/publish/pages/966195/940x415_a_programma_brug.jpg',
    },
    title: 'Oranje Loper: vernieuwing 9 bruggen en 5 straten',
  },
]

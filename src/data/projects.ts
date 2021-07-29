export type Borough = {
  cmsId: number
  id: number
  name: string
}

export const boroughs: Borough[] = [
  {cmsId: 5398, id: 1, name: 'Centrum'},
  {cmsId: 5520, id: 2, name: 'Nieuw-West'},
  {cmsId: 5565, id: 3, name: 'Noord'},
  {cmsId: 5399, id: 4, name: 'Oost'},
  {cmsId: 5397, id: 5, name: 'West'},
  {cmsId: 5396, id: 6, name: 'Zuid'},
  {cmsId: 5393, id: 7, name: 'Zuidoost'},
]

export type NewsArticle = {
  date: string
  image_url: string
  content: string
  title: string
}

export type ProjectsWithSubscriptionStatus = Record<string, boolean>

export type ReadArticle = {
  id: string
  publicationDate: string
}

export type NotificationSettings = {
  projectsEnabled: boolean
  projects: ProjectsWithSubscriptionStatus
  readArticles: ReadArticle[]
}

export type ProjectsWithSubscriptionStatus = Record<string, boolean>

export type NotificationSettings = {
  projectsEnabled: boolean
  projects: ProjectsWithSubscriptionStatus
  readIds: string[]
}

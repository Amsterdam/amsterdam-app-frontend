// if boolean is true, it means the user is subscribed to
// projects with a 'false' value are held in store
// to easily re-subscribe later
export type ProjectsWithSubscriptionStatus = Record<string, boolean>

export type NotificationSettings = {
  projectsEnabled: boolean
  projects: ProjectsWithSubscriptionStatus
  readIds: string[]
}

export type ProjectManagerSettings = {
  id: string
  projects: string[]
}

export type Settings = {
  notifications?: NotificationSettings
  'project-manager'?: ProjectManagerSettings
}

export type SubscribedProjects = Record<string, boolean>

export type NotificationSettings = {
  projectsEnabled: boolean
  projects: SubscribedProjects
}

export type ProjectManagerSettings = {
  id: string
  projects: string[]
}

export type Settings = {
  notifications?: NotificationSettings
  'project-manager'?: ProjectManagerSettings
}

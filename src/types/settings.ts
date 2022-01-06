// if boolean is true, it means the user is subscribed to
// projects with a 'false' value are held in store
// to easily re-subscribe later
export type SubscribedProjects = Record<string, boolean>

export type NotificationSettings = {
  projectsEnabled: boolean
  projects: SubscribedProjects
  readIds: Set<string>
}

export type ProjectManagerSettings = {
  id: string
  projects: string[]
}

export type Settings = {
  notifications?: NotificationSettings
  'project-manager'?: ProjectManagerSettings
}

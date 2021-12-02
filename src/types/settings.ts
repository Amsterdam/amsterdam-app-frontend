export type NotificationSettings = {
  projectsEnabled?: boolean
  projects?: SubscribedProjects
}

export type Manager = {
  id: string
  projects: string[]
}

export type SubscribedProjects = Record<string, boolean>

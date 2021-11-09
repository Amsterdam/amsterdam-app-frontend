export type NotificationSettings = {
  projectsEnabled?: boolean
  projects?: SubscribedProjects
}

export type SubscribedProjects = Record<string, boolean>

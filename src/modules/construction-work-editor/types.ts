export enum ConstructionWorkEditorEndpointName {
  getProjectManager = 'getProjectManager',
  getProjects = 'getProjects',
}

export type ConstructionWorkEditor = {
  id?: string
  hasSeenWelcomeMessage: boolean
  projects: string[]
}

export type ConstructionWorkEditorResponse = {
  identifier: string
  email: string
  projects: string[]
}

export enum ConstructionWorkEditorEndpointName {
  getProjectManager = 'getProjectManager',
  getProjects = 'getProjects',
}

export type ProjectManager = {
  id: string
  projects: string[]
}

export type ProjectManagerResponse = {
  identifier: string
  email: string
  projects: string[]
}

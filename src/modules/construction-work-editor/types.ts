export type ProjectManager = {
  id: string
  projects: string[]
}

export enum ConstructionWorkEditorEndpointName {
  getProjectManager = 'getProjectManager',
}

export type ProjectManagerResponse = {
  identifier: string
  email: string
  projects: string[]
}

export enum ConstructionWorkEditorEndpointName {
  addProjectWarning = 'addProjectWarning',
  addProjectWarningImage = 'addProjectWarningImage',
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

export type ProjectWarningImageQueryArg = {
  project_warning_id: string
  image: {
    main: boolean
    description: string
    data: string
  }
}

export type ProjectWarningResponse = {
  warning_identifier: string
}

export type NewMessage = {
  title: string
  body: string
  project_identifier: string
  project_manager_id: string
}

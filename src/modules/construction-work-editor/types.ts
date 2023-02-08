export enum ConstructionWorkEditorEndpointName {
  addProjectWarning = 'addProjectWarning',
  addProjectWarningImage = 'addProjectWarningImage',
  getProjectManager = 'getProjectManager',
  getProjects = 'getProjects',
}

export type ConstructionWorkEditor = {
  hasSeenWelcomeMessage: boolean
  id?: string
  projects: string[]
}

export type ConstructionWorkEditorResponse = {
  email: string
  identifier: string
  projects: string[]
}

export type ProjectWarningImageQueryArg = {
  image: {
    data: string
    description: string
    main: boolean
  }
  project_warning_id: string
}

export type ProjectWarningResponse = {
  warning_identifier: string
}

export type NewMessage = {
  body: string
  project_identifier: string
  project_manager_id: string
  title: string
}

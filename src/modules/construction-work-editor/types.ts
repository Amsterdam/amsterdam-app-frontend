import {ApiImage} from '@/types/api'

export enum ConstructionWorkEditorEndpointName {
  addProjectWarning = 'addProjectWarning',
  addProjectWarningImage = 'addProjectWarningImage',
  getProjectManager = 'getProjectManager',
  getProjects = 'getProjects',
}

export type ConstructionWorkEditor = {
  hasSeenWelcomeMessage: boolean
  id?: string
}

export type ConstructionWorkEditorResponseProject = {
  id: string
  images: ApiImage[]
  subtitle: string
  title: string
}

export type ConstructionWorkEditorResponse = {
  email: string
  identifier: string
  projects: ConstructionWorkEditorResponseProject[]
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

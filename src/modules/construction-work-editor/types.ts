import {JwtPayload} from 'jwt-decode'
import {ApiImage} from '@/types/api'

export enum ConstructionWorkEditorEndpointName {
  addProjectWarning = 'addProjectWarning',
  addProjectWarningImage = 'addProjectWarningImage',
  getProjectManager = 'getProjectManager',
  getProjects = 'getProjects',
}

export type ConstructionWorkEditorResponseProject = {
  id: string
  images: ApiImage[]
  subtitle: string
  title: string
}

export type ConstructionWorkEditorResponse =
  ConstructionWorkEditorResponseProject[]

type ImageQueryArgs = {
  image?: {
    data: string
    description: string
    main: boolean
  }
}

export type ProjectWarningResponse = {
  warning_identifier: string
}

type ProjectWarningQueryArgs = {
  body: string
  send_push_notification: boolean
  title: string
}

export type AddProjectWarningQueryArgs = {
  projectId: string
} & ProjectWarningQueryArgs &
  ImageQueryArgs

export type DecodedJwtToken = {
  groups?: string[]
} & JwtPayload

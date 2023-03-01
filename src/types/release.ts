import {ModuleServerConfig} from '@/modules/types'

export type Release = {
  created: string
  modified: string
  modules: ModuleServerConfig[]
  published: string
  releaseNotes: string
  unpublished: string
  version: string
}

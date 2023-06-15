import {mergeModulesConfig} from './mergeModulesConfig'
import {ModuleClientConfig, ModuleServerConfig} from '@/modules/types'

const clientConfig = [
  {slug: 'slug1'},
  {slug: 'slug2'},
  {slug: 'slug3'},
] as unknown as ModuleClientConfig[]

const serverConfig = [
  {moduleSlug: 'slug1'},
  {moduleSlug: 'slug2'},
  {moduleSlug: 'slug3'},
] as unknown as ModuleServerConfig[]

describe('mergeModulesConfig', () => {
  test('handle empty server config', () => {
    expect(mergeModulesConfig(clientConfig, [])).toEqual([])
  })
  test('handle empty client config', () => {
    expect(mergeModulesConfig([], serverConfig)).toEqual([])
  })
  test('ignore server config mismatch', () => {
    expect(
      mergeModulesConfig(clientConfig, [
        ...serverConfig,
        {moduleSlug: 'slug999'} as unknown as ModuleServerConfig,
      ]),
    ).toEqual([
      {slug: 'slug1', moduleSlug: 'slug1'},
      {slug: 'slug2', moduleSlug: 'slug2'},
      {slug: 'slug3', moduleSlug: 'slug3'},
    ])
  })
  test('ignore client config mismatch', () => {
    expect(
      mergeModulesConfig(
        [...clientConfig, {slug: 'slug999'} as unknown as ModuleClientConfig],
        serverConfig,
      ),
    ).toEqual([
      {slug: 'slug1', moduleSlug: 'slug1'},
      {slug: 'slug2', moduleSlug: 'slug2'},
      {slug: 'slug3', moduleSlug: 'slug3'},
    ])
  })
  test('merge server and client', () => {
    expect(mergeModulesConfig(clientConfig, [...serverConfig])).toEqual([
      {slug: 'slug1', moduleSlug: 'slug1'},
      {slug: 'slug2', moduleSlug: 'slug2'},
      {slug: 'slug3', moduleSlug: 'slug3'},
    ])
  })
})

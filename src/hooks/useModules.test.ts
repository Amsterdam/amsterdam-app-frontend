import {postProcessClientModules} from './useModules'
import {ModuleClientConfig, ModuleServerConfig} from '@/modules/types'

const clientModuleConfigs = [
  {slug: 'slug0'},
  {slug: 'slug1'},
  {slug: 'slug2', alwaysEnabled: true},
  {slug: 'slug3', requiresAuthorization: true},
] as unknown as ModuleClientConfig[]
const serverModuleConfigs = [
  {moduleSlug: 'slug0'},
  {moduleSlug: 'slug1'},
  {moduleSlug: 'slug2'},
  {moduleSlug: 'slug3'},
] as unknown as ModuleServerConfig[]

describe('postProcessClientModules', () => {
  test('returns correct allModulesDangerous', () => {
    expect(
      postProcessClientModules(clientModuleConfigs, [], [], serverModuleConfigs)
        ?.allModulesDangerous,
    ).toEqual([
      {slug: 'slug0', moduleSlug: 'slug0'},
      {slug: 'slug1', moduleSlug: 'slug1'},
      {slug: 'slug2', alwaysEnabled: true, moduleSlug: 'slug2'},
      {slug: 'slug3', requiresAuthorization: true, moduleSlug: 'slug3'},
    ])
  })
  test('returns authorizedModules, without unauthenticated modules', () => {
    expect(
      postProcessClientModules(clientModuleConfigs, [], [], serverModuleConfigs)
        ?.authorizedModules,
    ).toEqual([
      {slug: 'slug0', moduleSlug: 'slug0'},
      {slug: 'slug1', moduleSlug: 'slug1'},
      {slug: 'slug2', alwaysEnabled: true, moduleSlug: 'slug2'},
    ])
  })
  test('returns authorizedModules, with authenticated modules', () => {
    expect(
      postProcessClientModules(
        clientModuleConfigs,
        [],
        ['slug3'],
        serverModuleConfigs,
      )?.authorizedModules,
    ).toEqual([
      {slug: 'slug0', moduleSlug: 'slug0'},
      {slug: 'slug1', moduleSlug: 'slug1'},
      {slug: 'slug2', alwaysEnabled: true, moduleSlug: 'slug2'},
      {slug: 'slug3', requiresAuthorization: true, moduleSlug: 'slug3'},
    ])
  })
  test('returns correct enabledModules', () => {
    expect(
      postProcessClientModules(
        clientModuleConfigs,
        ['slug1'],
        [],
        serverModuleConfigs,
      )?.enabledModules,
    ).toEqual([
      {slug: 'slug0', moduleSlug: 'slug0'},
      {slug: 'slug2', alwaysEnabled: true, moduleSlug: 'slug2'},
    ])
  })
  test('returns correct enabledModules if an authorized module exists', () => {
    expect(
      postProcessClientModules(
        clientModuleConfigs,
        ['slug1', 'slug3'],
        ['slug3'],
        serverModuleConfigs,
      )?.enabledModules,
    ).toEqual([
      {slug: 'slug0', moduleSlug: 'slug0'},
      {slug: 'slug2', alwaysEnabled: true, moduleSlug: 'slug2'},
    ])
  })
  test('returns correct enabledModulesBySlug', () => {
    expect(
      postProcessClientModules(
        clientModuleConfigs,
        ['slug1'],
        [],
        serverModuleConfigs,
      )?.enabledModulesBySlug,
    ).toEqual(['slug0', 'slug2'])
  })
  test('returns correct toggleableModules', () => {
    expect(
      postProcessClientModules(
        clientModuleConfigs,
        ['slug0'],
        [],
        serverModuleConfigs,
      )?.toggleableModules,
    ).toEqual([
      {slug: 'slug0', moduleSlug: 'slug0'},
      {slug: 'slug1', moduleSlug: 'slug1'},
    ])
  })
  test('returns correct toggleableModules if an authorized module exists', () => {
    expect(
      postProcessClientModules(
        clientModuleConfigs,
        ['slug0'],
        ['slug3'],
        serverModuleConfigs,
      )?.toggleableModules,
    ).toEqual([
      {slug: 'slug0', moduleSlug: 'slug0'},
      {slug: 'slug1', moduleSlug: 'slug1'},
      {slug: 'slug3', requiresAuthorization: true, moduleSlug: 'slug3'},
    ])
  })
})

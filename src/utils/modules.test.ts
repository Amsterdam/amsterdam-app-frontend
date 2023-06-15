import {mergeModulesConfig, postProcessModules} from './modules'
import {ModuleClientConfig, ModuleServerConfig} from '@/modules/types'

describe('mergeModulesConfig', () => {
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

describe('postProcessModules', () => {
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

  test('returns correct allModulesDangerous', () => {
    expect(
      postProcessModules(clientModuleConfigs, [], [], serverModuleConfigs)
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
      postProcessModules(clientModuleConfigs, [], [], serverModuleConfigs)
        ?.authorizedModules,
    ).toEqual([
      {slug: 'slug0', moduleSlug: 'slug0'},
      {slug: 'slug1', moduleSlug: 'slug1'},
      {slug: 'slug2', alwaysEnabled: true, moduleSlug: 'slug2'},
    ])
  })
  test('returns authorizedModules, with authenticated modules', () => {
    expect(
      postProcessModules(
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
      postProcessModules(
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
      postProcessModules(
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
      postProcessModules(
        clientModuleConfigs,
        ['slug1'],
        [],
        serverModuleConfigs,
      )?.enabledModulesBySlug,
    ).toEqual(['slug0', 'slug2'])
  })
  test('returns correct toggleableModules', () => {
    expect(
      postProcessModules(
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
      postProcessModules(
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

import {getApi, Environment, GlobalApiSlug} from './environment'
import {ModuleSlug} from './modules/slugs'
import {customDefaultUrls} from './store/slices/environment'

describe('getApi', () => {
  test('returns correct api url for development environment', () => {
    expect(
      getApi(
        Environment.development,
        customDefaultUrls,
        ModuleSlug['waste-guide'],
      ),
    ).toBe('https://ontw.app.amsterdam.nl/waste-guide/api/v1')
  })
  test('returns correct api url for test environment', () => {
    expect(
      getApi(Environment.test, customDefaultUrls, ModuleSlug['waste-guide']),
    ).toBe('https://test.app.amsterdam.nl/waste-guide/api/v1')
  })
  test('returns correct api url for acceptance environment', () => {
    expect(
      getApi(
        Environment.acceptance,
        customDefaultUrls,
        ModuleSlug['waste-guide'],
      ),
    ).toBe('https://acc.app.amsterdam.nl/waste-guide/api/v1')
  })
  test('returns correct api url for production environment', () => {
    expect(
      getApi(
        Environment.production,
        customDefaultUrls,
        ModuleSlug['waste-guide'],
      ),
    ).toBe('https://app.amsterdam.nl/waste-guide/api/v1')
  })
  test('returns correct api url for custom environment with custom modules api definition', () => {
    expect(
      getApi(Environment.custom, customDefaultUrls, GlobalApiSlug.modules),
    ).toBe(customDefaultUrls.modules)
  })
  test('returns correct api url for custom environment with custom contact api definition', () => {
    expect(
      getApi(Environment.custom, customDefaultUrls, ModuleSlug.contact),
    ).toBe(customDefaultUrls.contact)
  })
  test('returns correct api url for custom environment with custom construction-work api definition', () => {
    expect(
      getApi(
        Environment.custom,
        customDefaultUrls,
        ModuleSlug['construction-work'],
      ),
    ).toBe(customDefaultUrls['construction-work'])
  })
})

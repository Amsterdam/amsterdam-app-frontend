import {getApi, Environment, EnvironmentAzure} from './environment'
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
    ).toBe('https://api-dev-waste-guide.app-amsterdam.nl/api/v1')
  })
  test('returns correct api url for acceptance environment', () => {
    expect(
      getApi(
        Environment.acceptance,
        customDefaultUrls,
        ModuleSlug['waste-guide'],
      ),
    ).toBe('https://api-test-waste-guide.app-amsterdam.nl/api/v1')
  })
  test('returns correct api url for production environment', () => {
    expect(
      getApi(
        Environment.production,
        customDefaultUrls,
        ModuleSlug['waste-guide'],
      ),
    ).toBe('https://api-waste-guide.app-amsterdam.nl/api/v1')
  })
  test('returns correct api url for custom environment', () => {
    expect(
      getApi(Environment.custom, customDefaultUrls, ModuleSlug['waste-guide']),
    ).toBe('https://api-test-waste-guide.app-amsterdam.nl/api/v1')
  })
  test('returns correct api url for development Azure environment', () => {
    expect(
      getApi(
        EnvironmentAzure.developmentAzure,
        customDefaultUrls,
        ModuleSlug['waste-guide'],
      ),
    ).toBe('https://ontw.app.amsterdam.nl/waste-guide/api/v1')
  })
  test('returns correct api url for test Azure environment', () => {
    expect(
      getApi(
        EnvironmentAzure.testAzure,
        customDefaultUrls,
        ModuleSlug['waste-guide'],
      ),
    ).toBe('https://test.app.amsterdam.nl/waste-guide/api/v1')
  })
  test('returns correct api url for acceptance Azure environment', () => {
    expect(
      getApi(
        EnvironmentAzure.acceptanceAzure,
        customDefaultUrls,
        ModuleSlug['waste-guide'],
      ),
    ).toBe('https://acc.app.amsterdam.nl/waste-guide/api/v1')
  })
  test('returns correct api url for production Azure environment', () => {
    expect(
      getApi(
        EnvironmentAzure.productionAzure,
        customDefaultUrls,
        ModuleSlug['waste-guide'],
      ),
    ).toBe('https://app.amsterdam.nl/waste-guide/api/v1')
  })
  test('returns correct api url for custom environment with custom api definition', () => {
    expect(
      getApi(
        Environment.custom,
        customDefaultUrls,
        ModuleSlug['construction-work'],
      ),
    ).toBe(customDefaultUrls['construction-work'])
  })
  test('returns correct api url for divergent api slug', () => {
    expect(
      getApi(
        Environment.production,
        customDefaultUrls,
        ModuleSlug['construction-work'],
      ),
    ).toBe('https://api-backend.app-amsterdam.nl/api/v1')
  })
  test("returns external api url for 'address' slug", () => {
    expect(
      getApi(Environment.production, customDefaultUrls, ModuleSlug.address),
    ).toBe('https://api.pdok.nl/bzk/locatieserver/search/v3_1')
  })
})

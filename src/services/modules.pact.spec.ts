import path from 'path'
import {Pact} from '@pact-foundation/pact'
import {eachLike, like} from '@pact-foundation/pact/src/dsl/matchers'
import fetch from 'node-fetch'

const provider = new Pact({
  consumer: 'amsterdam-app-frontend',
  provider: 'amsterdam-app-backend',
  cors: true,
  dir: path.resolve(process.cwd(), 'pacts'),
  host: '127.0.0.1',
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  logLevel: 'debug',
  pactfileWriteMode: 'update',
  port: 7890,
})

describe('API Pact test', () => {
  beforeAll(() => provider.setup())
  afterEach(() => provider.verify())
  afterAll(() => provider.finalize())

  describe('getting all modules', () => {
    test('modules exist', async () => {
      // set up Pact interactions
      await provider.addInteraction({
        state: 'modules exist',
        uponReceiving: 'get all modules',
        withRequest: {
          method: 'GET',
          path: '/modules',
          headers: {
            // Accept: 'application/json; charset=utf-8',
            'App-Version': like('1.0.0.0'),
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: {
            result: eachLike({
              slug: 'waste-guide',
              version: '0.16.5.8439',
              title: 'Afval module',
              description: 'Regel al je afvalzaken',
              icon: 'trash-bin',
              status: 1,
            }),
            status: like(true),
          },
        },
      })

      const module = await (
        await fetch(provider.mockService.baseUrl + '/modules', {
          headers: {'App-Version': '0.16.5.8439'},
        })
      ).json()

      expect(module).toStrictEqual({
        result: [
          {
            slug: 'waste-guide',
            version: '0.16.5.8439',
            title: 'Afval module',
            description: 'Regel al je afvalzaken',
            icon: 'trash-bin',
            status: 1,
          },
        ],
        status: true,
      })
    })
    test('', () => {})
  })

  describe('', () => {})
})

import path from 'path'
import {Pact} from '@pact-foundation/pact'
import {eachLike, like} from '@pact-foundation/pact/src/dsl/matchers'
import fetch from 'node-fetch'

const PATH = '/api/v1/modules_for_app'

const provider = new Pact({
  consumer: 'amsterdam-app-frontend',
  provider: 'amsterdam-app-modules',
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
          path: PATH,
          headers: {
            Accept: 'application/json',
            'App-Version': like('1.0.0.0'),
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            result: eachLike({
              slug: like('waste-guide'),
              version: like('0.16.5.8439'),
              title: like('Afval module'),
              description: like('Regel al je afvalzaken'),
              icon: like('trash-bin'),
              status: like(1),
            }),
            status: like(true),
          },
        },
      })

      const module = await (
        await fetch(provider.mockService.baseUrl + PATH, {
          headers: {'App-Version': '0.16.5.8439', Accept: 'application/json'},
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
    test('Bad request', async () => {
      // set up Pact interactions
      await provider.addInteraction({
        state: 'bad request',
        uponReceiving: 'get all modules',
        withRequest: {
          method: 'GET',
          path: PATH,
          headers: {
            Accept: 'application/json',
          },
        },
        willRespondWith: {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            result: like('Error message'),
            status: like(false),
          },
        },
      })

      const module = await (
        await fetch(provider.mockService.baseUrl + PATH, {
          headers: {Accept: 'application/json'},
        })
      ).json()

      expect(module).toStrictEqual({
        result: 'Error message',
        status: false,
      })
    })
    test('server error', async () => {
      // set up Pact interactions
      await provider.addInteraction({
        state: 'backend error',
        uponReceiving: 'get all modules',
        withRequest: {
          method: 'GET',
          path: PATH,
          headers: {
            Accept: 'application/json',
            'App-Version': like('1.0.0.0'),
          },
        },
        willRespondWith: {
          status: 504,
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            result: like('Error message'),
            status: like(false),
          },
        },
      })

      const module = await (
        await fetch(provider.mockService.baseUrl + PATH, {
          headers: {'App-Version': '0.16.5.8439', Accept: 'application/json'},
        })
      ).json()

      expect(module).toStrictEqual({
        result: 'Error message',
        status: false,
      })
    })
  })
})

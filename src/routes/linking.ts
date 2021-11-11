const config = {
  screens: {
    Home: {
      path: 'omgevingsmanager/:id',
      parse: {
        id: (id: string) => `${id}`,
      },
    },
  },
}

export const linking = {
  prefixes: ['amsterdam://'],
  config,
}

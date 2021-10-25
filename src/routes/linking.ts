const config = {
  screens: {
    Home: {
      path: 'home/:id',
      parse: {
        id: (id: string) => `${id}`,
      },
    },
  },
}

export const linking = {
  prefixes: ['amsterdam://omgevingsmanager'],
  config,
}

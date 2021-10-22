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
  prefixes: ['https://com.amsterdam/omgevingsmanager'],
  config,
}

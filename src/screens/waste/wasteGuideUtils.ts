export const ophaaldag = (ophaaldag?: string, frequentie?: string) =>
  ophaaldag && [ophaaldag, frequentie].join(', ')

export const buitenZetten = (vanaf?: string, tot?: string) =>
  vanaf && tot && vanaf + ' tot ' + tot?.toLowerCase()

// TODO Just make a button, not an inline link
export const opmerking = (text?: string) =>
  text?.replace(
    'online',
    '<Link onPress={Linking.openURL(\'https://formulieren.acc.amsterdam.nl/TriplEforms/Directregelen/formulier/nl-NL/evAmsterdam/grofafval.aspx?GUID=1015BS,100,,HV\') text="online")/>',
  )

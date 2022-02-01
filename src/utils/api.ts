export const generateRequestUrl = (url: string, params = {}) => {
  const arrayParams = Object.entries(params)
    .filter(([, value]) => Array.isArray(value))
    .flatMap(([key, value]) =>
      (value as string[]).flatMap((val: string) => `${key}=${val}`),
    )

  const scalarParams = Object.entries(params)
    .filter(([, value]) => Boolean(value) && !Array.isArray(value))
    .flatMap(([key, value]) => `${key}=${value}`)

  const queryParams = arrayParams.concat(scalarParams).join('&')
  const requestURL = [url, queryParams].filter(Boolean).join('?')
  return requestURL
}

export const obfuscateQueryParams = (str?: string) =>
  str
    ?.replace(/(report_code=)[^&]+/gi, '$1***')
    .replace(/(vehicle_id=)[^&]+/gi, '$1***')

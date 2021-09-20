export const regexLibrary = {
  // example: input: href="/publish... output: href="https//amsterdam.nl/publish...
  plainPublish: {
    regex: /"\/publish/g,
    replace: '"https://www.amsterdam.nl/publish',
  },

  // example input: &quote;/publish..., output: &quot;https://www.amsterdam.nl/publish...v
  quotePublish: {
    regex: /&quot;\/publish/g,
    replace: '&quot;https://www.amsterdam.nl/publish',
  },
}

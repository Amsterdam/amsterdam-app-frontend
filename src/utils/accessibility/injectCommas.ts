/**
 * Injects commas between text fragments to induce a pause of breath when reading aloud.
 */
export const injectCommas = (...fragments: (string | undefined)[]) =>
  fragments.filter(fragment => fragment).join(', ')

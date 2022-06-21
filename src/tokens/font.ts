type FontList = {
  h1: number
  h2: number
  h3: number
  h4: number
  // Slightly larger paragraph text, not in design system.
  l1: number
  p1: number
  t1: number
}

type FontTokens = {
  height: FontList
  leadingBottom: FontList
  leadingTop: FontList
  size: FontList
  weight: {
    bold: string
    demi: string
    regular: string
  }
}

/**
 * @deprecated Use `theme` instead.
 */
export const font: FontTokens = {
  height: {
    h1: 30,
    h2: 28,
    h3: 28,
    h4: 25,
    l1: 25,
    p1: 22,
    t1: 18,
  },
  leadingBottom: {
    h1: 30,
    h2: 28,
    h3: 28,
    h4: 3,
    l1: 3,
    p1: 22,
    t1: 18,
  },
  leadingTop: {
    h1: 0,
    h2: 0,
    h3: 0,
    h4: 0,
    l1: 0,
    p1: 0,
    t1: 0,
  },
  size: {
    h1: 24,
    h2: 20,
    h3: 20,
    h4: 18,
    l1: 18,
    p1: 16,
    t1: 14,
  },
  weight: {
    bold: 'AvenirNext-Bold',
    demi: 'AvenirNext-DemiBold',
    regular: 'AvenirNext-Regular',
  },
}

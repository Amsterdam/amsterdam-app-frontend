export const getFillColor = (fill: string, opacity: number) => {
  if (!['red', 'green', 'blue'].includes(fill)) {
    return fill
  }

  return `rgba(${fill === 'red' ? 255 : 0}, ${fill === 'green' ? 255 : 0}, ${fill === 'blue' ? 255 : 0}, ${opacity})`
}

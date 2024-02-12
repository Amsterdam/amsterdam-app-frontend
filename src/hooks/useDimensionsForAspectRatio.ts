import {useMemo} from 'react'

const getHeightFromWidth = (width: number, ratio: number) => ({
  width,
  height: Math.round(width / ratio),
})

const getWidthFromHeight = (height: number, ratio: number) => ({
  width: Math.round(height * ratio),
  height,
})

export const getimensionsForAspectRatio = (
  defaultWidth: number,
  defaultHeight: number,
  desiredWidth?: number,
  desiredHeight?: number,
  widthTakesPrecedence = true,
) => {
  if (!desiredWidth && !desiredHeight) {
    return {width: defaultWidth, height: defaultHeight}
  }

  const ratio = defaultWidth / defaultHeight

  if (widthTakesPrecedence) {
    if (desiredWidth) {
      return getHeightFromWidth(desiredWidth, ratio)
    }

    if (desiredHeight) {
      return getWidthFromHeight(desiredHeight, ratio)
    }

    return {width: defaultWidth, height: defaultHeight}
  }

  if (desiredHeight) {
    return getWidthFromHeight(desiredHeight, ratio)
  }

  if (desiredWidth) {
    return getHeightFromWidth(desiredWidth, ratio)
  }

  return {width: defaultWidth, height: defaultHeight}
}

export const useDimensionsForAspectRatio = (
  defaultWidth: number,
  defaultHeight: number,
  desiredWidth?: number,
  desiredHeight?: number,
  widthTakesPrecedence = true,
) =>
  useMemo(
    () =>
      getimensionsForAspectRatio(
        defaultWidth,
        defaultHeight,
        desiredWidth,
        desiredHeight,
        widthTakesPrecedence,
      ),
    [
      defaultHeight,
      defaultWidth,
      desiredHeight,
      desiredWidth,
      widthTakesPrecedence,
    ],
  )

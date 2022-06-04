import {
  ColorProps,
  ColorScale,
  ColorVariant,
  OverlayColorName,
  ThemeColorName,
  ThemeColorProps,
  ThemeColorSuffix,
} from './types'

export function capitalize<T extends string>(str: T) {
  return (str.charAt(0).toUpperCase() +
    str.slice(1).toLocaleLowerCase()) as Capitalize<T>
}

export function getScaleFromThemeColorKey(
  key: `${ThemeColorName}${ThemeColorSuffix}${ColorScale}`,
): ColorScale {
  const match = key.match(/\d+$/) as [ColorScale, ...any]
  return match[0]
}

const variantSuffixMap: {
  [key in ColorVariant]: ThemeColorSuffix
} = {
  light: '',
  lightA: 'A',
  dark: 'Dark',
  darkA: 'DarkA',
}

export function getVariantSuffix(variant: ColorVariant) {
  return variantSuffixMap[variant]
}

export function generateColors<T>({
  init,
  addOverlayColor,
  addThemeColor,
}: {
  init: T
  addOverlayColor: (name: OverlayColorName, obj: T) => void
  addThemeColor: (
    name: ThemeColorName,
    obj: T,
    variants: ColorVariant[],
    alias?: string,
  ) => void
}) {
  return function (colors: ColorProps) {
    const obj = { ...init }
    for (const color of colors) {
      if (color.name === 'white') {
        addOverlayColor('white', obj)
      } else if (color.name === 'black') {
        addOverlayColor('black', obj)
      } else {
        const { name, alias, variants } = color as ThemeColorProps
        addThemeColor(name, obj, variants ?? ['light'], alias)
      }
    }
    return obj
  }
}

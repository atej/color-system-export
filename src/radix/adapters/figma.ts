import { join } from 'path'
import * as radixColors from '@radix-ui/colors'
import { createFile, getTimestamp } from '../../shared/utils'
import {
  ColorVariant,
  OverlayColorName,
  Palette,
  RadixColorsKey,
  ThemeColorName,
  ThemeColorProps,
} from '../types'
import { getVariantSuffix } from '../utils'

const figmaTokens: {
  [key in SetName]: { colors: ColorTokens }
} = {
  global: {
    colors: {
      white: {
        value: 'hsl(0, 0%, 100%)',
        type: 'color',
      },
      black: {
        value: 'hsl(0, 0%, 0%)',
        type: 'color',
      },
      transparent: {
        value: 'rgba(0, 0, 0, 0)',
        type: 'color',
      },
    },
  },
  light: {
    colors: {},
  },
  dark: {
    colors: {},
  },
}

const getColorObj = (colorName: RadixColorsKey) => {
  let colorObj: ColorTokens = {}
  const radixColorObj = radixColors[colorName]
  for (const key in radixColorObj) {
    colorObj[key] = {
      type: 'color',
      // @ts-ignore
      value: radixColorObj[key],
    }
  }
  return colorObj
}

const getOverlayColorKey = (colorName: OverlayColorName) =>
  `${colorName}A` as RadixColorsKey

const getThemeKey = (
  colorName: ThemeColorName,
  variant: ColorVariant,
): RadixColorsKey => {
  return `${colorName}${getVariantSuffix(variant)}` as RadixColorsKey
}

const addColors = (palette: Palette) => {
  const { colors } = palette
  for (const color of colors) {
    let key: RadixColorsKey
    if (color.name === 'white' || color.name === 'black') {
      key = getOverlayColorKey(color.name)
      figmaTokens.global.colors = {
        ...figmaTokens.global.colors,
        ...getColorObj(key),
      }
    } else {
      const props = color as ThemeColorProps
      const { name } = props
      for (const variant of props.variants ?? ['light']) {
        key = getThemeKey(name, variant)
        const tokenKey = variant.includes('light') ? 'light' : 'dark'
        const colorsObj = getColorObj(key)
        let aliasedObj: ColorTokens = {}
        if (props.alias) {
          for (const key in colorsObj) {
            aliasedObj[key.replace(name, props.alias)] = {
              type: 'color',
              value: colorsObj[key].value,
            }
          }
        }
        figmaTokens[tokenKey].colors = {
          ...figmaTokens[tokenKey].colors,
          ...(props.alias ? aliasedObj : colorsObj),
        }
      }
    }
  }
}

const getColorCount = (sets: SetName[]) =>
  sets.reduce(
    (count, set) => count + Object.keys(figmaTokens[set].colors).length,
    0,
  )

const serialize = (set: SetName) => JSON.stringify(figmaTokens[set])

export const createFigmaTokensJsonFiles = (palette: Palette) => {
  addColors(palette)
  const sets = Object.keys(figmaTokens) as SetName[]

  for (const set of sets) {
    const fileName = `${set}-${getTimestamp()}.json`
    const filePath = join(palette.id, 'radix', 'figma')
    const data = serialize(set)
    createFile(fileName, data, filePath)
  }

  // Log color counts
  console.log(
    `Exported ${getColorCount(sets)} color tokens.\nGlobal(${getColorCount([
      'global',
    ])}) | Light(${getColorCount(['light'])}) | Dark(${getColorCount([
      'dark',
    ])})`,
  )
}

//#region
type SetName = 'global' | 'light' | 'dark'
type ColorToken = {
  value: string
  type: 'color'
}
type ColorTokens = {
  [x: string]: ColorToken
}
//#endregion

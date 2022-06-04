import { join } from 'path'
import * as radixColors from '@radix-ui/colors'
import { createFile, getTimestamp } from '../../shared/utils'
import {
  ColorScale,
  ColorVariant,
  OverlayColorName,
  OverlayColorSuffix,
  Palette,
  ThemeColorName,
  ThemeColorSuffix,
} from '../types'
import {
  capitalize,
  generateColors,
  getScaleFromThemeColorKey,
  getVariantSuffix,
} from '../utils'

function addOverlayColor(name: OverlayColorName, obj: SketchColors) {
  const radixObj = radixColors[`${name}A`]
  const keys = Object.keys(radixObj) as Array<keyof typeof radixObj>
  for (const key of keys) {
    obj[`${capitalize(name)} / ${key}`] = radixObj[key]
  }
}

function addThemeColor(
  name: ThemeColorName,
  obj: SketchColors,
  variants: ColorVariant[],
  alias?: string,
) {
  for (const variant of variants) {
    const radixObj = radixColors[`${name}${getVariantSuffix(variant)}`]
    const keys = Object.keys(radixObj) as Array<keyof typeof radixObj>
    for (const key of keys) {
      const lowerAlias = alias ? alias.toLocaleLowerCase() : null
      const colorGroup = lowerAlias ? capitalize(lowerAlias) : capitalize(name)
      const colorName = lowerAlias ? lowerAlias : name
      const colorSuffix = getVariantSuffix(variant)
      const colorScale = getScaleFromThemeColorKey(key)
      obj[`${colorGroup} / ${colorName}${colorSuffix}${colorScale}`] =
        radixObj[key]
    }
  }
}

export const generateSketchColors = generateColors<SketchColors>({
  init: {
    'White / white': '#ffffff',
    'Black / black': '#000000',
    'Transparent / transparent': 'hsla(0,0,0,0)',
  },
  addOverlayColor,
  addThemeColor,
})

export const serializeSketchColors = (colors: SketchColors) => {
  let serialized = ''
  for (const key in colors) {
    serialized += `${key}: ${colors[key as SketchColorName]}\n`
  }
  return serialized
}

export const createSketchColorsTextFile = (palette: Palette) => {
  const fileName = `${palette.id}-${getTimestamp()}`
  createFile(
    fileName,
    serializeSketchColors(generateSketchColors(palette.colors)),
    join('radix', 'sketch'),
    `💎 SKETCH: import file using the 'Import Colors' plugin`,
  )
}

//#region TYPES
type GenSketchThemeColorName<T extends string> =
  `${Capitalize<T>} / ${T}${ThemeColorSuffix}${ColorScale}`

type GenSketchOverlayColorName<T extends OverlayColorName> =
  `${Capitalize<T>} / ${T}${OverlayColorSuffix}${ColorScale}`

type SketchThemeColorName = GenSketchThemeColorName<string>

type SketchOverlayColorName =
  | GenSketchOverlayColorName<'white'>
  | GenSketchOverlayColorName<'black'>

type SketchSingleColors =
  | 'White / white'
  | 'Black / black'
  | 'Transparent / transparent'

type SketchColorName =
  | SketchThemeColorName
  | SketchOverlayColorName
  | SketchSingleColors

type SketchColors = Partial<{
  [key in SketchColorName]: string
}>
//#endregion

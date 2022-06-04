import * as radixColors from '@radix-ui/colors'

export type RadixColors = typeof radixColors

export type RadixColorsKey = keyof RadixColors

//#region THEME COLOR NAME
export type ThemeColorName = (
  | 'tomato'
  | 'red'
  | 'crimson'
  | 'pink'
  | 'plum'
  | 'purple'
  | 'violet'
  | 'indigo'
  | 'blue'
  | 'cyan'
  | 'teal'
  | 'green'
  | 'grass'
  | 'orange'
  | 'brown'
  // Bright Colors
  | 'sky'
  | 'mint'
  | 'lime'
  | 'yellow'
  | 'amber'
  // Grays
  | 'gray'
  | 'mauve'
  | 'slate'
  | 'sage'
  | 'olive'
  | 'sand'
  // Metals
  | 'gold'
  | 'bronze'
) &
  RadixColorsKey
//#endregion

export type OverlayColorName = 'white' | 'black'

export type ColorName = ThemeColorName | OverlayColorName

export type ColorVariant = 'light' | 'lightA' | 'dark' | 'darkA'

export type ColorScale =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'

export type ThemeColorSuffix = '' | 'A' | 'Dark' | 'DarkA'

export type OverlayColorSuffix = 'A'

export type ThemeColorProps = {
  name: ThemeColorName
  alias?: string
  variants?: ColorVariant[]
}

export type OverLayColorProps = {
  name: OverlayColorName
}

export type ColorProps = Array<ThemeColorProps | OverLayColorProps>

export type Palette = {
  id: string
  colors: ColorProps
}

export type Action = (palette: Palette) => void

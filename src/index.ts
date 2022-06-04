import { Adapter, ColorSystem, Data } from './shared/types'
import { serializeKeys } from './shared/utils'
import { RADIX } from './radix'

const DATA: Data = {
  radix: RADIX,
}

function main() {
  const args = process.argv.slice(2)
  const colorSystem = args[0] as ColorSystem
  const paletteId = args[1]
  const adapter = args[2] as Adapter

  const isValidColorSystem = !!DATA[colorSystem]

  if (!isValidColorSystem) {
    const validColorSystems = serializeKeys(DATA)
    console.error(
      '🚨 Please provide a valid color system.\nOptions: ',
      validColorSystems,
    )
    return 1
  }

  const { palettes, actions } = DATA[colorSystem]

  const isValidPalette = !!palettes[paletteId]

  if (!isValidPalette) {
    const validPaletteNames = serializeKeys(palettes)
    console.error(
      '🚨 Please provide a valid palette name.\nOptions: ',
      validPaletteNames,
    )
    return 1
  }

  const isValidAdapter = !!actions[adapter]

  if (!isValidAdapter) {
    const validAdapterNames = serializeKeys(actions)
    console.error(
      '🚨 Please provide a valid export target.\nOptions: ',
      validAdapterNames,
    )
    return 1
  }

  const palette = palettes[paletteId]
  actions[adapter](palette)
  return 0
}

main()

export type ColorSystem = 'radix'

export type Adapter = 'sketch' | 'figma'

export type IPalette = {
  id: string
  colors: any
}

export type IAction = (palette: IPalette) => any

export type IActions = {
  [key in Adapter]: IAction
}

export type ColorSystemObject = {
  palettes: { [x: string]: IPalette }
  actions: IActions
}

export type Data = {
  [key in ColorSystem]: ColorSystemObject
}

import { Adapter } from '../shared/types'
import { createSketchColorsTextFile } from './adapters/sketch'
import { createFigmaTokensJsonFiles } from './adapters/figma'
import { Action } from './types'

export const ACTIONS: {
  [key in Adapter]: Action
} = {
  sketch: createSketchColorsTextFile,
  figma: createFigmaTokensJsonFiles,
}

import { Adapter } from '../shared/types'
import { createSketchColorsTextFile } from './adapters/sketch'
import { Action } from './types'

export const ACTIONS: {
  [key in Adapter]: Action
} = {
  sketch: createSketchColorsTextFile,
}

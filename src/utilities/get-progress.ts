import {VideoLoadProgress} from '../types'

export function getProgress({loaded, total}: VideoLoadProgress) {
  const percent = Math.round((loaded * 100) / total)
  return `${percent}% - ${loaded} de ${total}`
}

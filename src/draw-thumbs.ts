import type {VideoLoaded} from './types'
import {create} from './utilities'

export function drawThumbs({
  width: videoWidth,
  height,
  thumbnails,
}: VideoLoaded) {
  const width = videoWidth * thumbnails.length
  const canvas = create('canvas', {width, height})
  const context = canvas.getContext('2d')
  if (context) {
    thumbnails.forEach((thumb, i) => {
      const image = new Image()
      image.src = thumb
      image.onload = () => {
        context.drawImage(image, i * videoWidth, 0)
      }
    })
  }
  return canvas
}

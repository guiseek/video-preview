import type {VideoLoadProgressCallback, VideoLoaded} from './types'
import {getAspect, create} from './utilities'

export function loadVideo(
  src: string,
  ratio: number,
  size: number,
  videoLoadProgress: VideoLoadProgressCallback = () => {}
) {
  return new Promise<VideoLoaded>((resolve, reject) => {
    const video = create('video', {src, crossOrigin: 'anonymous'})
    video.onerror = reject

    const thumbnails: string[] = []

    video.onloadeddata = () => {
      const total = Math.round(video.duration)

      const interval = total / 10 < 1 ? 1 : total / 10

      const {width, height} = getAspect(video, ratio, size)

      video.ontimeupdate = () => {
        const canvas = create('canvas', {width, height})
        const context = canvas.getContext('2d')!

        context.drawImage(video, 0, 0, width, height)

        if (video.currentTime < video.duration) {
          const thumbnail = canvas.toDataURL()

          thumbnails.push(thumbnail)

          video.currentTime += interval
          const loaded = Math.round(video.currentTime)
          videoLoadProgress({thumbnail, loaded, total})
        } else {
          resolve({width, height, thumbnails})
        }
      }

      video.currentTime += interval
    }
  })
}

import {create, getProgress, query} from './utilities'
import type {VideoLoadProgress} from './types'
import {drawThumbs} from './draw-thumbs'
import {loadVideo} from './load-video'
import './style.scss'

const size = 320
const ratio = 16 / 9
const main = query('main')
const output = query('output', main)

const updateProgress = (videoProgress: VideoLoadProgress) => {
  output.innerText = getProgress(videoProgress)
}

const input = create('input', {
  type: 'file',
  accept: 'video/mp4,video/mpeg',
  onchange() {
    const [file] = Array.from(input.files ?? [])
    const src = URL.createObjectURL(file)
    loadVideo(src, ratio, size, updateProgress)
      .then(drawThumbs)
      .then((timeline) => {
        query('div.timeline').append(timeline)
      })
  },
})

main.appendChild(input)

const videos = ['web-standards-for-the-future.mp4']

videos.map((innerText) => {
  document.body.append(
    create('button', {
      innerText,
      onclick() {
        loadVideo(innerText, ratio, size, updateProgress)
          .then(drawThumbs)
          .then((timeline) => {
            query('div.timeline').append(timeline)
          })
      },
    })
  )
})

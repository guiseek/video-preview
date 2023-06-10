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

const input = {
  file: create('input', {
    type: 'file',
    accept: 'video/mp4,video/mpeg',
    onchange() {
      const [file] = Array.from(input.file.files ?? [])
      const src = URL.createObjectURL(file)
      loadVideo(src, ratio, size, updateProgress)
        .then(drawThumbs)
        .then((tl) => {
          query('div.timeline').append(tl)
          input.file.value = ''
        })
    },
  }),
  url: create('input', {
    type: 'url',
    pattern: `^.*\.(mp4)$`,
    placeholder: 'Ex.: https://website.com/some-video.mp4',
    oninput() {
      if (input.url.validity.valid) {
        loadVideo(input.url.value, ratio, size, updateProgress)
          .then(drawThumbs)
          .then((tl) => {
            query('div.timeline').append(tl)
            input.url.value = ''
          })
      }
    },
  }),
}

const fieldset = create('fieldset')
fieldset.append(...Object.values(input))

const videos = ['web-standards-for-the-future.mp4']

videos.map((innerText) => {
  fieldset.append(
    create('button', {
      innerText,
      onclick() {
        loadVideo(innerText, ratio, size, updateProgress)
          .then(drawThumbs)
          .then((tl) => query('div.timeline').append(tl))
      },
    })
  )
})

main.append(fieldset)

import {VideoLoadProgress} from './video-load-progress'

interface VideoLoadProgressCallback {
  (value: VideoLoadProgress): void
}

export type { VideoLoadProgressCallback }
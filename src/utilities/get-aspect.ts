export function getAspect(
  {videoWidth, videoHeight}: HTMLVideoElement,
  ratio: number,
  size: number
) {
  const isLandscape = videoWidth > videoHeight
  return isLandscape
    ? {width: size, height: size / ratio}
    : {width: size / ratio, height: size}
}

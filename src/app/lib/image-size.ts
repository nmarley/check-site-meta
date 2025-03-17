import imageSize from "image-size";

export async function getImageSizeFromResponse(response: Response) {
  const abuf = await response.arrayBuffer().catch(error => {
    // console.log("getImageSizeFromResponse: Error fetching image buffer", error)
    return undefined
  })
  if (!abuf) return { arrayBufferError: true }

  const buffer = (() => {
    try {
      return Buffer.from(abuf)
    } catch (error) {
      // console.log("getImageSizeFromResponse: Error converting to buffer", error)
      return undefined
    }
  })()
  if (!buffer) return { bufferError: true }

  const imageSizeRes = (() => {
    try {
      return imageSize(buffer)
    } catch (error) {
      // console.log("getImageSizeFromResponse: Error getting image size", error)
      return undefined
    }
  })()
  if (!imageSizeRes) return { imageSizeError: true }

  return { imageSize: imageSizeRes, buffer }


}
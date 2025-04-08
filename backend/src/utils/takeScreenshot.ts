import axios from 'axios'
import sharp from 'sharp'

export default async function takeScreenshot(url: string): Promise<Buffer> {
  try {
    const apiUrl = `https://api.screenshotmachine.com/?key=${process.env.SCREENSHOTMACHINE_API_KEY}&url=${url}&device=desktop&dimension=1920x1080&format=png`

    const response = await axios.get(apiUrl, { responseType: 'arraybuffer' })
    const screenshotBuffer = Buffer.from(response.data)

    const compressedImage = await sharp(screenshotBuffer)
      .resize({ height: 250 })
      .png({ quality: 80 })
      .toBuffer()

    return compressedImage
  } catch (error) {
    console.error('Error while taking screenshot:', error)
    throw error
  }
}

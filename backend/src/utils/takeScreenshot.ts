import puppeteer, { Browser } from 'puppeteer'
import sharp from 'sharp'

export default async function takeScreenshot(url: string): Promise<Buffer> {
  let browser: Browser | null = null

  try {
    browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      timeout: 0,
    })

    const page = await browser.newPage()

    await page.setViewport({ width: 1920, height: 1080 })

    await page.goto(url, { waitUntil: 'networkidle0', timeout: 0 })

    const screenshotBuffer: Uint8Array = await page.screenshot({ type: 'png' })

    const compressedImage = await sharp(screenshotBuffer)
      .resize({ height: 250 })
      .png({ quality: 80 })
      .toBuffer()

    return compressedImage
  } catch (error) {
    console.error('Error while taking screenshot:', error)
    if (browser) {
      await browser.close()
    }
    throw error
  } finally {
    if (browser) {
      await browser.close()
    }
  }
}

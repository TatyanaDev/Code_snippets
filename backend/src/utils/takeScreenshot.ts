import { chromium, Browser } from 'playwright'
import sharp from 'sharp'

export default async function takeScreenshot(url: string): Promise<Buffer> {
  let browser: Browser | null = null

  try {
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox'],
    })

    const page = await browser.newPage()

    await page.setViewportSize({ width: 1920, height: 1080 })

    await page.goto(url, { waitUntil: 'networkidle' })

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

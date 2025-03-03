import puppeteer from 'puppeteer'

export default async function takeScreenshot(url: string): Promise<Buffer> {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.setViewport({ width: 1920, height: 1080 })
  await page.goto(url, { waitUntil: 'networkidle0' })

  const screenshotBuffer = await page.screenshot({ type: 'png' })

  await browser.close()

  return Buffer.from(screenshotBuffer)
}

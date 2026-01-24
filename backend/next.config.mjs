import { withPayload } from '@payloadcms/next/withPayload'
import { fileURLToPath } from 'url'
import path from 'path'

/** @type {import('next').NextConfig} */

const nextConfig = {
  outputFileTracingRoot: path.join(path.dirname(fileURLToPath(import.meta.url))),
  basePath: process.env.NODE_ENV === 'production' ? '/dev-sketches' : '',
  reactStrictMode: true,
  devIndicators: false,
  trailingSlash: true,
}

export default withPayload(nextConfig)

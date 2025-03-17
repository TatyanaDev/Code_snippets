import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */

const nextConfig = {
  basePath: process.env.NODE_ENV === 'production' ? '/dev-sketches' : '',
  trailingSlash: true,
}

export default withPayload(nextConfig)

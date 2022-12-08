const { PHASE_DEVELOPMENT_SERVER } = require('next/dist/shared/lib/constants')

/** @type {import('next').NextConfig} */
module.exports = (phase) => {

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      async rewrites() {
        return [
          {
            source: '/p/api/:path*',
            destination: 'http://127.0.0.1:8081/:path*'
          }
        ]
      }
    }
  }

  return {
    reactStrictMode: true,
  }
}
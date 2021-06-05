var webpack = require('webpack')

module.exports = (phase) => {
  return {
    webpack: (config) => {
      config.plugins.push(new webpack.IgnorePlugin(/^pg-native$/))

      if (!process.env.BUNDLE_AWS_SDK) {
        config.externals = config.externals || []
      } else {
        console.warn('Bundling aws-sdk. Only doing this in development mode')
      }

      return config
    },
    target: 'serverless',
    trailingSlash: false,
    env: {
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      GOOGLE_ID: process.env.GOOGLE_ID,
      GOOGLE_SECRET: process.env.GOOGLE_SECRET,
      POSTGRES_HOST: process.env.POSTGRES_HOST,
      POSTGRES_USERNAME: process.env.POSTGRES_USERNAME,
      POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
      POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
      POSTGRES_PORT: process.env.POSTGRES_PORT,
      MUIX_LICENCE: process.env.MUIX_LICENCE,
    },
  }
}

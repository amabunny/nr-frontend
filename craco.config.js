const CracoLessPlugin = require('craco-less')
const cloneDeep = require('lodash/cloneDeep')
const { getThemeVariables } = require('antd/dist/theme')
const path = require('path')

const lessLoaderOptions = {
  modifyVars: {
    ...getThemeVariables({
      dark: true,
      compact: true
    }),
    'font-size-sm': '16px',
    'font-size-base': '16px'
  },
  javascriptEnabled: true,
  paths: [path.resolve(__dirname, 'src')]
}

module.exports = {
  eslint: {
    mode: 'file'
  },
  plugins: [{ plugin: CracoLessPlugin }],
  babel: {
    plugins: [
      ['import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
      }]
    ]
  },
  webpack: {
    configure: (webpackConfig) => {
      const loaders = webpackConfig.module.rules[1].oneOf

      loaders.push({
        test: /\.module\.(less)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
              }
            }
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: cloneDeep(lessLoaderOptions)
            }
          }
        ]
      })

      loaders.push({
        test: /\.(less)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: cloneDeep(lessLoaderOptions)
            }
          }
        ]
      })

      return webpackConfig
    }
  }
}

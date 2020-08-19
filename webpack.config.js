const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = (env, argv) => {
  const PROD = argv.mode === 'production'
  return {
    entry: './src/scripts/main.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: PROD
        ? 'assets/[name]-[contenthash:8].js'
        : 'assets/[name].js',
      publicPath: '/'
    },
    optimization: PROD ? {
      runtimeChunk: 'single',
      splitChunks: {
        name: 'vendor',
        chunks: 'all'
      }
    } : {},
    devtool: 'source-map',
    devServer: {
      overlay: true
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-srcsets-loader',
              options: {
                interpolate: true
              }
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCSSExtractPlugin.loader,
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('autoprefixer')
                ],
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        },
        {
          test: /\.(jpg|png|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: PROD
                  ? 'assets/[name]-[contenthash:8].[ext]'
                  : 'assets/[name].[ext]',
                esModule: false
              }
            }
          ]
        },
        {
          test: /\.(woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'assets/[name].[ext]'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin([
        {
          from: 'src/assets/static',
          to: 'assets'
        }
      ]),
      new HTMLWebpackPlugin({
        template: 'src/index.html'
      }),
      new MiniCSSExtractPlugin({
        filename: PROD
          ? 'assets/[name]-[contenthash:8].css'
          : 'assets/[name].css'
      }),
      PROD && new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: [
            'default', {
              discardComments: {
                removeAll: true
              }
            }
          ]
        },
        cssProcessorOptions: {
          map: {
            inline: false,
            annotation: true,
          }
        }
      }),
      PROD && new TerserPlugin({
        sourceMap: true,
        terserOptions: {
          output: {
            comments: false
          }
        }
      })
    ].filter(Boolean)
  }
}

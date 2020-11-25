import path from 'path';
const CompressionPlugin = require('compression-webpack-plugin');
const WebpackZipPlugin = require('webpack-zip-plugin');
import * as IWebpackChainConfig from 'webpack-chain';
let packageJson = require('../package.json');

const isProd = () => {
  return process.env.NODE_ENV === 'production';
};

function getModulePackageName(module: { context: string }) {
  if (!module.context) return null;

  const nodeModulesPath = path.join(__dirname, '../node_modules/');
  if (module.context.substring(0, nodeModulesPath.length) !== nodeModulesPath) {
    return null;
  }

  const moduleRelativePath = module.context.substring(nodeModulesPath.length);
  const [moduleDirName] = moduleRelativePath.split(path.sep);
  let packageName: string | null = moduleDirName;
  // handle tree shaking
  if (packageName && packageName.match('^_')) {
    // eslint-disable-next-line prefer-destructuring
    packageName = packageName.match(/^_(@?[^@]+)/)![1];
  }
  return packageName;
}

const webpackPlugin = (config: IWebpackChainConfig) => {
  config.merge({
    output: {
      filename: `static/js/[name]_[${isProd() ? 'chunkhash' : 'hash'}].js`,
      chunkFilename: `static/js/[name]_[${isProd() ? 'chunkhash' : 'hash'}].js`,
    },
  });
  // config.plugin('extract-css').tap(args => [{
  //   filename: `static/css/[name]_[contenthash].css`,
  //   chunkFilename: `static/css/[name]_[contenthash].css`
  // }])

  config.module
    .rule('images')
    .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
    .use('url-loader')
    .tap(() => {
      return {
        limit: 10240, // 图片小于10Kb才会base64编码
        fallback: {
          loader: 'file-loader',
          options: {
            name: `static/img/[name].[hash:5].[ext]`,
          },
        },
      };
    });

  // optimize chunks
  config.optimization
    // share the same chunks across different modules
    .runtimeChunk(false)
    .splitChunks({
      chunks: 'async',
      name: 'vendors',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendors: {
          test: (module: { context: string }) => {
            const packageName = getModulePackageName(module) || '';
            if (packageName) {
              return [
                'bizcharts',
                'gg-editor',
                'g6',
                '@antv',
                'l7',
                'gg-editor-core',
                'bizcharts-plugin-slider',
              ].includes(packageName);
            }
            return false;
          },
          name(module: { context: string }) {
            const packageName = getModulePackageName(module);
            if (packageName) {
              if (['bizcharts', '@antv_data-set'].indexOf(packageName) >= 0) {
                return 'viz'; // visualization package
              }
            }
            return 'misc';
          },
        },
      },
    });

  if (process.env.NODE_ENV.includes('test') || process.env.NODE_ENV.includes('prod')) {
    //zip包
    config.plugin('webpack-zip-plugin').use(WebpackZipPlugin, [
      {
        initialFile: './dist',
        endPath: './',
        zipName: `${packageJson.name}.zip`,
      },
    ]);

    //gzip压缩
    config.plugin('compression-webpack-plugin').use(CompressionPlugin, [
      {
        test: /\.js$|\.html$|\.css$/, //匹配文件名
        threshold: 10240, //对超过10k的数据压缩
        deleteOriginalAssets: false, //不删除源文件
      },
    ]);
  }
};

export default webpackPlugin;

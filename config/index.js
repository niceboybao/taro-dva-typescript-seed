const path = require('path');
const pkg = require('../package.json');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');

const noAnalyzer = process.env.USE_ANALYZER === 'No';
const isDev = process.argv.indexOf('development') > -1;
const isLocal = process.env.LOCAL;
const currentEnv = process.env.SERVER_ENV;
const ASSETS_HOST = {
  dev: {
    imgs: 'https://dev-assets.hnzycfc.com',
    medias: 'https://dev-assets.hnzycfc.com',
    statics: 'https://dev-assets.hnzycfc.com',
  },
  sit: {
    imgs: 'https://sit-assets.hnzycfc.com',
    medias: 'https://sit-assets.hnzycfc.com',
    statics: 'https://sit-assets.hnzycfc.com',
  },
  uat: {
    imgs: 'https://uat-assets.hnzycfc.com',
    medias: 'https://uat-assets.hnzycfc.com',
    statics: 'https://uat-assets.hnzycfc.com',
  },
  grey: {
    imgs: 'https://grey-assets.hnzycfc.com',
    medias: 'https://grey-assets.hnzycfc.com',
    statics: 'https://grey-assets.hnzycfc.com',
  },
  prod: {
    imgs: 'https://s.hnzycfc.com',
    medias: 'https://s.hnzycfc.com',
    statics: 'https://s.hnzycfc.com',
  },
};

const ProjectName = 'sentry_h5';

const config = {
  projectName: ProjectName,
  date: '2020-6-22',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  defineConstants: {
    __SERVER_ENV__: JSON.stringify(process.env.SERVER_ENV),
    __TARO_ENV__: JSON.stringify(process.env.TARO_ENV),
    __ISLOCAL__: JSON.stringify(process.env.LOCAL),
    __VERSION__: JSON.stringify(pkg.version),
  },
  alias: {
    '@/actions': path.resolve(__dirname, '..', 'src/actions'),
    '@/assets': path.resolve(__dirname, '..', 'src/assets'),
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/constants': path.resolve(__dirname, '..', 'src/constants'),
    '@/models': path.resolve(__dirname, '..', 'src/models'),
    '@/services': path.resolve(__dirname, '..', 'src/services'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@/package': path.resolve(__dirname, '..', 'package.json'),
  },
  babel: {
    sourceMap: true,
    presets: [
      [
        'env',
        {
          modules: false,
        },
      ],
    ],
    plugins: [
      'transform-decorators-legacy',
      'transform-class-properties',
      'transform-object-rest-spread',
      [
        'transform-runtime',
        {
          helpers: false,
          polyfill: false,
          regenerator: true,
          moduleName: 'babel-runtime',
        },
      ],
    ],
  },
  plugins: ['@tarojs/plugin-sass', '@tarojs/plugin-terser'],
  mini: {
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: ['last 3 versions', 'Android >= 4.1', 'ios >= 8'],
        },
      },
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 10240, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
  h5: {
    publicPath: '/',
    basename: `/${ProjectName}`,
    staticDirectory: 'static',
    sourceMapType: 'source-map',
    enableSourceMap: true,
    devServer: {
      port: 10086,
    },
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
      sourceMapFilename: '[name].js.map',
    },
    publicPath: true
      ? `/${ProjectName}`
      : `${ASSETS_HOST[currentEnv].statics}/${ProjectName}/${pkg.version}`,
    staticDirectory: 'assets',
    webpackChain(chain, webpack) {
      chain.merge({
        optimization: {
          splitChunks: {
            cacheGroups: {
              vendors: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                chunks: 'all',
              },
            },
          },
        },
        // new SentryWebpackPlugin({
        //   include: '.',
        //   ignoreFile: '.sentrycliignore',
        //   ignore: ['node_modules', 'webpack.config.js'],
        //   configFile: 'sentry.properties',
        // }),
      });

      if (noAnalyzer) {
        chain
          .plugin('analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
          .end();
      }
    },
    enableExtract: true,
    miniCssExtractPluginOption: {
      filename: '[name].[hash:8].css',
      chunkFilename: '[name].[hash:8].css',
    },
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: ['last 3 versions', 'Android >= 4.1', 'ios >= 8'],
        },
      },
      // 内置插件只能转px为rem
      pxtransform: {
        enable: false,
      },
      'postcss-plugin-px2viewport': {
        enable: true,
        config: {
          exclude: [/[\\/]node_modules[\\/]/],
        },
      },
    },
    imageUrlLoaderOption: {
      limit: 8192,
      name: '[name][hash:8].[ext]',
      publicPath: !isLocal
        ? `${ASSETS_HOST[currentEnv].imgs}/${ProjectName}/${pkg.version}/`
        : '',
      outputPath: 'assets/images/',
    },
    fontUrlLoaderOption: {
      limit: 8192,
      name: '[name][hash:8].[ext]',
      publicPath: !isLocal
        ? `${ASSETS_HOST[currentEnv].statics}/${ProjectName}/${pkg.version}/`
        : '',
      outputPath: isDev ? '' : 'assets/fonts/',
    },
    mediaUrlLoaderOption: {
      limit: 8192,
      name: '[name].[ext]',
      publicPath: !isLocal
        ? `${ASSETS_HOST[currentEnv].statics}/${ProjectName}/${pkg.version}/`
        : '',
    },
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'));
  }
  return merge({}, config, require('./prod'));
};

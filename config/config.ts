/*
 * @Author: your name
 * @Date: 2020-10-19 14:50:34
 * @LastEditTime: 2020-11-25 10:07:39
 * @LastEditors: xnwang02
 * @Description: In User Settings Edit
 * @FilePath: /yst-iwork-alpha/config/config.ts
 */
import { defineConfig, utils } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import webpackPlugin from './plugin.config';
import getEnvConfig from './env.config';
import router from '../src/router/';

const { winPath } = utils;
// preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION, BUILD_PRODUCTION, GA_KEY } = process.env;

const IS_PROD = BUILD_PRODUCTION && BUILD_PRODUCTION.includes('prod');
const extraBabelPlugins = IS_PROD ? ['transform-remove-console'] : [];

export default defineConfig({
  title: defaultSettings.title,
  base: '/yst-iwork-alpha/', // 配置访问路径baseUrl
  outputPath: 'dist',
  publicPath: '/yst-iwork-alpha/', // 部署到的目录
  hash: true,
  antd: {},
  analytics: GA_KEY ? { ga: GA_KEY } : false,
  extraBabelPlugins,
  dva: {
    hmr: true,
  },
  locale: {
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 9,
    chrome: 58,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [...router.routes],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
    // 'modal-mask-bg': defaultSettings.modalMaskBg,
    // 'animation-duration-base': '0.8s',
  },
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
    ...getEnvConfig(BUILD_PRODUCTION),
  },
  ignoreMomentLocale: true,
  lessLoader: {
    javascriptEnabled: true,
  },
  cssLoader: {
    modules: {
      getLocalIdent: (
        context: {
          resourcePath: string;
        },
        _: string,
        localName: string,
      ) => {
        if (
          context.resourcePath.includes('node_modules') ||
          context.resourcePath.includes('ant.design.pro.less') ||
          context.resourcePath.includes('global.less')
        ) {
          return localName;
        }
        const match = context.resourcePath.match(/src(.*)/);
        if (match && match[1]) {
          const antdProPath = match[1].replace('.less', '');
          const arr = winPath(antdProPath)
            .split('/')
            .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
            .map((a: string) => a.toLowerCase());
          return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
        }
        return localName;
      },
    },
  },
  manifest: {
    basePath: '/',
  },
  externals: {
    HWPlayer: 'HWPlayer',
    hwplayerloaded: 'hwplayerloaded',
  },
  proxy: proxy[BUILD_PRODUCTION || 'dev'],
  chainWebpack: webpackPlugin,
});

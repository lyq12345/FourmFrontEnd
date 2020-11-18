/*
 * @Author: your name
 * @Date: 2020-09-02 09:56:09
 * @LastEditTime: 2020-11-17 14:38:23
 * @LastEditors: xnwang02
 * @Description: In User Settings Edit
 * @FilePath: /yst-iwork-alpha/config/proxy.ts
 */
/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    // 当前应用
    '/yst-iwork-alpha-api': {
      // target: 'http://10.213.3.39:8081',
      target: 'http://10.3.3.65:8081',
      // target: 'http://rap2.idc.yst.com.cn/backend/app/mock/151',
      changeOrigin: true,
      pathRewrite: { '^/yst-iwork-alpha-api': '' },
    },
    '/basic-address': {
      target: 'http://basiccommon-test.yst.com.cn',
      // target: 'http://10.213.10.49:8080',
      changeOrigin: true,
      pathRewrite: { '^/basic-address': '' },
    },
    // sso接口转发
    '/sso-api': {
      target: 'http://sso-dev.yst.com.cn/sso/',
      changeOrigin: true,
      pathRewrite: { '^/sso-api': '' },
    },
    '/candy': {
      target: 'http://10.213.10.49:8080',
      changeOrigin: true,
      pathRewrite: { '^/candy-api': '' },
    },
    '/home-page': {
      target: 'http://10.213.3.39:8093',
      changeOrigin: true,
      pathRewrite: { '^/home-page': '' },
    },
  },
  test: {
    '/yst-iwork-alpha-api': {
      target: 'http://potalapi-test.yst.com.cn',
      changeOrigin: true,
      pathRewrite: { '^/yst-iwork-alpha-api': '' },
    },
    '/sso-api': {
      target: 'http://sso-test.yst.com.cn/sso/',
      changeOrigin: true,
      pathRewrite: { '^/sso-api': '' },
    },
    '/candy': {
      target: 'http://10.213.10.49:8080',
      changeOrigin: true,
      pathRewrite: { '^/candy-api': '' },
    },
    '/homePage': {
      target: 'http://10.213.3.39:8093',
      changeOrigin: true,
      pathRewrite: { '^/homePage': '' },
    },
    '/basic-address': {
      target: 'http://basiccommon-test.yst.com.cn',
      // target: 'http://10.213.10.49:8080',
      changeOrigin: true,
      pathRewrite: { '^/basic-address': '' },
    },
  },
};

/*
 * @Author: your name
 * @Date: 2020-09-02 09:56:09
 * @LastEditTime: 2020-09-09 10:25:39
 * @LastEditors: Please set LastEditors
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
      target: 'http://10.213.10.49:8080',
      changeOrigin: true,
      pathRewrite: { '^/yst-iwork-alpha-api': '' },
    },
    // sso接口转发
    '/sso-api': {
      target: 'http://sso-dev.yst.com.cn/sso/',
      changeOrigin: true,
      pathRewrite: { '^/sso-api': '' },
    },
  },
  test: {
    '/yst-iwork-alpha-api': {
      target: 'http://10.213.10.49:8080',
      changeOrigin: true,
      pathRewrite: { '^/yst-iwork-alpha-api': '' },
    },
    '/sso-api': {
      target: 'http://sso-test.yst.com.cn/sso/',
      changeOrigin: true,
      pathRewrite: { '^/sso-api': '' },
    },
  },
};

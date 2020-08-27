
function getConfig(name: String) {
  const currentEnvTitle = name === 'prod' ? 'production' : name
  let envConfig = {
    REACT_APP_TITLE: currentEnvTitle,
    REACT_APP_BASIC_API:'/yst-iwork-alpha-api/',
  }
  
  const currentEnvDomainFlag = name === 'prod' ? '' : `-${name}`
  // sso配置
  envConfig.REACT_APP_SSO_API = '/sso-api/'
  envConfig.REACT_APP_SSO_DOMAIN = `sso${currentEnvDomainFlag}.yst.com.cn`
  envConfig.REACT_APP_SSO_SDK_PATH = `//sso${currentEnvDomainFlag}.yst.com.cn/open-api/oauth_sdk.js`
  envConfig.REACT_APP_SSO_CLIENT_PATH = `//sso${currentEnvDomainFlag}.yst.com.cn/open-api/oauth_client.js`
  envConfig.REACT_APP_SSO_CLIENT_ID = 'newiwork'
   
  envConfig.USE_LOCAL_PREMISSION = true
  
  // 自定义配置
  const customEnvConfig = {
    dev: {},
    test: {},
    uat: {},
    prod: {},
  }
  return { ...envConfig, ...customEnvConfig[name] }
}
export default getConfig;

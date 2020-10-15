/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
import { logout } from '@/utils/utils';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * 异常处理程序
 */
interface ERROR  {
  response:{
    statusText:any,
    status:any,
    url:String,
  }
}
const errorHandler = (error:ERROR) => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    if (status === 401) {
      logout();
    } else {
      notification.error({
        message: `请求错误 ${status}: ${url}`,
        description: errorText,
      });
    }
  }
  throw error;
  // return response;
};

/**
 * 配置request请求时的默认参数
 */

const request = extend({
  errorHandler,
  // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

// request拦截器, 改变url 或 options.
request.interceptors.request.use((url, options) => {
  const Authorization = sessionStorage.getItem('Authorization');
  let URL;
  let headers = null;
  switch(options.prefixType){
    case 'sso':
      URL = `${REACT_APP_SSO_API}${url}`;
      break;
    case 'candy':
      URL = `/candy-api${url}`;
      break;
    default:
      // eslint-disable-next-line no-undef
    URL = `${REACT_APP_BASIC_API}${url}`;
  }
  // if (options.prefixType === 'sso') {
  //   URL = `${REACT_APP_SSO_API}${url}`;
  // } else {
  //   // eslint-disable-next-line no-undef
  //   URL = `${REACT_APP_BASIC_API}${url}`;
  // }
  if (Authorization) {
    headers = {
      Authorization,
      Accept: 'application/json',
    };
  }
  return {
    url: URL,
    options: { ...options,...headers  },
  };
});

request.interceptors.response.use(async (response) => {
  // 不是200的接口错误处理交给errorHandler
  if (response.status !== 200) return response;
  const contentType = response.headers.get('content-type');
  const dis = response.headers.get('content-disposition');
  if (contentType && contentType.indexOf('json') !== -1) {
    const data = await response.clone().json();
    // 异常处理
    const { success = false, message, errMsg } = data;
    if (!success) {
      notification.error({
        message: '提示',
        description: message || errMsg || '网络连接失败',
      });
    }
  } else if (dis && dis.search('attachment') !== -1) {
    const blob = await response.clone().blob();
    // 文件下载
    const downloadElement = document.createElement('a');
    const href = window.URL.createObjectURL(blob);
    const filenameKey = 'filename=';
    const indexOf = dis.indexOf(filenameKey);
    const filename = indexOf
      ? decodeURI(dis.substring(indexOf + filenameKey.length))
      : '未知文件名';
    downloadElement.href = href;
    /** 防止方法报错导致，没有error信息 */
    try {
      downloadElement.download = decodeURIComponent(escape(filename));
    } catch (e) {
      downloadElement.download = filename;
    }
    document.body.appendChild(downloadElement);
    downloadElement.click();
    window.URL.revokeObjectURL(href);
    document.body.removeChild(downloadElement);
  }
  return response;
});
// 中间件，对请求前、响应后做处理
// request.use(async (ctx, next) => {
//   const { req } = ctx;
//   const { url, options } = req;
//   // 添加前缀、后缀
//   // eslint-disable-next-line no-undef
//   ctx.req.url = `${options.isMaster ? '' : REACT_APP_BASE_API}${url}`;
//   await next();

//   // const { res } = ctx;
//   // const { success = false, message } = res;
//   // if (!success) {
//   //   notification.error({
//   //     message: `提示`,
//   //     description: message,
//   //   });
//   // }
// });

export default request;


import Cookies from 'js-cookie';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage/session';
import { LoginIn } from '@/api/public';
import { updateRefreshToken } from '@/services/user';

const persistConfig = {
  key: 'yst-iwork-alpha',
  storage,
};

const persistEnhancer = () => (createStore) => (reducer, initialState, enhancer) => {
  const store = createStore(persistReducer(persistConfig, reducer), initialState, enhancer);
  const persist = persistStore(store);
  return { ...store, persist };
};

export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
    extraEnhancers: [persistEnhancer()],
  },
};

// access_token刷新
setTimeout(() => {
  updateRefreshToken().then(res => {
    if (res.success) {
      Cookies.set('access_token', res.data.access_token)
      Cookies.set('refresh_token', res.data.refresh_token)
    }
  })
}, 1.5 * 60 * 60 * 1000)
/**
 *
 * ###### @params  oldRender 表示原来的render方法
 *   */

export async function render(oldRender) {
  let routeData = [];

  /**
   * TODO: 不使用权限是 本地菜单自定义
   */
  routeData = [
    {
      url: '/welcome',
      name: '欢迎',
      options: '<CoffeeOutlined/>',
    },
    {
      url: '/demo',
      name: '示例菜单',
      options: '<DashboardOutlined/>',
      children: [
        {
          url: '/demo/child',
          name: '示例子页面',
        },
      ],
    },
  ];



  // 根据配置 是否使用本地权限
  const tenant_code = Cookies.get('tenant_code');
  if (USE_LOCAL_PREMISSION) {
    localStorage.setItem(`${tenant_code}_menus_local`, JSON.stringify(routeData));
  }
  oldRender();
}

export function onRouteChange({ matchedRoutes }) {
  if (matchedRoutes.length) {
    document.title = matchedRoutes[matchedRoutes.length - 1].route.name || '';
  }
}

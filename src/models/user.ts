import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import Cookies from 'js-cookie';

import { queryCurrent, getJwt, query as queryUsers } from '@/services/user';
import { logout } from '@/utils/utils';

export interface CurrentUser {
  avatar?: string;
  name?: string;
  title?: string;
  group?: string;
  signature?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  userid?: string;
  unreadCount?: number;
}

export interface UserModelState {
  currentUser?: CurrentUser;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;
    logout: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    changeNotifyCount: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const { data } = yield call(queryCurrent);

      localStorage.setItem('userInfo', JSON.stringify(data));
      if (!data) {
        logout();
        return
      }
      yield put({
        type: 'saveCurrentUser',
        payload: {
          name: data.personName,
          avatar: '//sso.nfsq.com.cn/nfsq-sso/open-api/assets/user-default.jpg',
        },
      });
    },
    logout() {
      logout();
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};

export default UserModel;

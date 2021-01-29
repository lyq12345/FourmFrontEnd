import request from '@/utils/request';
import Cookies from 'js-cookie';
import { API_PREFIX } from '@/constants/common';

const accessToken = Cookies.get('access_token');
const refreshToken = Cookies.get('refresh_token');

export async function query(): Promise<any> {
  return request(`${API_PREFIX}/users`);
}

export async function queryCurrent(): Promise<any> {
  return request(`user/info?access_token=${accessToken}`, {
    prefixType: 'sso',
  });
}

export async function queryNotices(): Promise<any> {
  return request(`${API_PREFIX}/notices`);
}
export async function updateRefreshToken(): Promise<any> {
  return request(`/oauth2/refreshToken?client_id=${REACT_APP_SSO_CLIENT_ID}&refresh_token=${refreshToken}&grant_type=refresh_token`, {
    prefixType: 'sso',
  });
}

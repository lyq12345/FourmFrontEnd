import { parse } from 'querystring';
import { message } from 'antd';
import React from 'react';
import pathRegexp from 'path-to-regexp';
import { Route } from '@/models/connect';
import Cookies from 'js-cookie';
import * as Icon from '@ant-design/icons';
import { UPLOAD_WARNING } from '@/constants/common';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */
export const getAuthorityFromRouter = <T extends Route>(
  router: T[] = [],
  pathname: string,
): T | undefined => {
  const authority = router.find(
    ({ routes, path = '/' }) =>
      (path && pathRegexp(path).exec(pathname)) ||
      (routes && getAuthorityFromRouter(routes, pathname)),
  );
  if (authority) return authority;
  return undefined;
};

export const getRouteAuthority = (path: string, routeData: Route[]) => {
  let authorities: string[] | string | undefined;
  routeData.forEach((route) => {
    // match prefix
    if (pathRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
      if (route.authority) {
        authorities = route.authority;
      }
      // exact match
      if (route.path === path) {
        authorities = route.authority || authorities;
      }
      // get children authority recursively
      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};

export const getOpenKeysFromMenuData = (menuData?: MenuDataItem[]) => {
  if (!menuData) {
    return undefined;
  }
  return menuData.reduce((pre, item) => {
    if (item.key) {
      pre.push(item.key);
    }
    if (item.children) {
      const newArray: string[] = pre.concat(getOpenKeysFromMenuData(item.children) || []);
      return newArray;
    }
    return pre;
  }, [] as string[]);
};

// 过滤菜单中hide为true的路由
export const fliterRouter = (menuData = []) =>
  menuData
    .filter((item) => !item.hide)
    .map((item) => {
      const itemClone = Object.assign({}, item);
      if (itemClone.url && !itemClone.path) {
        itemClone.path = itemClone.url;
      }
      if (itemClone.path && !itemClone.url) {
        itemClone.url = itemClone.path;
      }
      if (!itemClone.url && !itemClone.path) {
        itemClone.path = '';
      }

      // 提取备注中的图标
      const matchArr = /^(\<)(.*)(\/\>)$/g.exec(item.options);
      if (matchArr && matchArr[2]) {
        const iconString = typeof matchArr[2] === 'string' && matchArr[2].trim();
        if (iconString) {
          itemClone.icon = React.createElement(Icon[matchArr[2].trim()]);
        }
      }
      // 提取自定义图标
      if (item.icon && Icon[item.icon]) {
        itemClone.icon = React.createElement(Icon[item.icon]);
      }
      if (itemClone.children) {
        itemClone.children = fliterRouter(itemClone.children);
      }
      return itemClone;
    });

export const logout = () => {
  const { localStorage, sessionStorage } = window;
  localStorage.clear();
  sessionStorage.clear();
  const params = ['access_token', 'client_id', 'refresh_token', 'scope', 'openid'];
  params.map((item) => Cookies.remove(item));
  window.location.reload();
};

// html编码（转义）
export const htmlEncode = (html: string): string => {
  if (!html) return null;
  // eslint-disable-next-line
  return html.replace(/[<>&"]/g, function (c) {
    return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c];
  });
};

// html解码（反转义）
export const htmlDecode = (str: string): string => {
  if (!str) return null;
  const arrEntities = { lt: '<', gt: '>', nbsp: ' ', amp: '&', quot: '"' };
  // eslint-disable-next-line
  return str.replace(/&(lt|gt|nbsp|amp|quot);/gi, function (all, t) {
    return arrEntities[t];
  });
};

// 校验尺寸
const isImgSize = (file, validUpload) =>
  new Promise((resolve, reject) => {
    const { width, height } = validUpload;
    const URL = window.URL || window.webkitURL;
    const img = new Image();
    img.onload = function () {
      const scaleX = img.width / width;
      const scaleY = img.height / height;
      const widthValid = img.width === width;
      const heightValid = img.height === height;
      // 宽高相等 或者等比
      const valid = (widthValid && heightValid) || scaleX === scaleY;
      if (valid) {
        resolve();
      } else {
        reject();
      }
    };
    img.src = URL.createObjectURL(file);
  }).then(
    () => {
      return file;
    },
    () => {
      message.error(`${file.name}图片尺寸不符合要求，请修改后重新上传！`);
      return Promise.reject();
    },
  );

export const getUploadExtraMsg = (type, field): object => {
  if (!type || !field) {
    message.warn('缺少必要信息');
    return null;
  }
  const currentObj = UPLOAD_WARNING[type][field];
  const { width, height, mb } = currentObj;

  return {
    width,
    height,
    mb,
    text: `请上传${width}*${height}像素，大小${mb}M内品类图片`,
  };
};

export const getCommonRules = ({ tip, require, length, symbol }, func) => {
  const rules = func ? [func] : [];

  if (require) {
    rules.push({
      required: true,
      message: tip || '该输入框不能为空!',
    });
  }

  if (symbol) {
    rules.push({
      pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/,
      message: '请输入汉字、英文或者数字',
    });
  }

  if (length) {
    rules.push({
      pattern: new RegExp(`^.{1,${length}}$`),
      message: `最大长度${length}个字符!`,
    });
  }

  return rules;
};

export const beforeImgUpload = async (file, validUpload) => {
  let isSize = true;
  let isLt2M = true;
  // 校验类型
  const isJpgOrPng =
    file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('请选择 JPG/PNG 文件!');
    return Promise.reject();
  }
  // 校验大小
  if (validUpload) {
    isLt2M = file.size / 1024 / 1024 < validUpload.mb;
    if (!isLt2M) {
      message.error(`文件必须小于 ${validUpload.mb}MB!`);
      return Promise.reject();
    }

    isSize = isImgSize(file, validUpload);
  }

  return isJpgOrPng && isLt2M && isSize;
};

export const beforeVideoUpload = (file) => {
  const isJpgOrPng =
    file.type === 'video/mpeg4' ||
    file.type === 'video/mp4' ||
    file.type === 'video/quicktime' ||
    file.type === 'video/mpg' ||
    file.type === 'video/x-flv' ||
    file.type === 'video/x-ms-wmv' ||
    file.type === 'video/avi' ||
    file.type === 'video/x-mpeg' ||
    file.type === 'video/x-matroska';
  if (!isJpgOrPng) {
    message.error('请选择指定类型文件!');
    return Promise.reject();
  }
  const isLt2M = file.size / 1024 / 1024 < 2000;
  if (!isLt2M) {
    message.error('文件必须小于 200MB!');
    return Promise.reject();
  }
  return isJpgOrPng && isLt2M;
};

export const beforeFileUpload = (file) => {
  // 校验类型
  const isFileType =
    file.type === 'application/msword' ||
    file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    file.type === 'application/vnd.ms-powerpoint' ||
    file.type === 'application/pdf' ||
    file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
    file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
    file.type === 'application/vnd.ms-excel' ||
    file.name.endsWith('.xls') ||
    file.type === 'application/zip' ||
    file.type === 'application/rar';
  if (!isFileType) {
    message.error('请选择 doc/pdf/xls/zip 文件!');
    return Promise.reject();
  }
  const isLt2M = file.size / 1024 / 1024 < 5;
  if (!isLt2M) {
    message.error('文件必须小于 5MB!');
    return Promise.reject();
  }
  return isFileType && isLt2M;
};

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
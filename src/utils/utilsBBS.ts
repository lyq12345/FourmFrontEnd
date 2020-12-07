import { createFromIconfontCN } from '@ant-design/icons';
import { useHistory, useLocation } from 'umi';

/**
 * 使用方法
 * @example
 * <IconFont type="iconzan" />
 *
 */
export const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2221832_ttd4gdaay6p.js',
});

/**
 * 传入 postId/threadId
 */
export function useBBSGotoPost() {
  const history = useHistory();
  return (threadId: number, needNewTab = false) => {
    if (needNewTab) {
      open(`${origin}/yst-iwork-alpha/bbs/post/${threadId}`);
    } else {
      history.push(`/bbs/post/${threadId}`);
      window.scrollTo(0, 0);
    }
  };
}

/**
 * 传入 square id
 */
export function useBBSGotoSquare() {
  const history = useHistory();
  return (squareId: number, needNewTab = false) => {
    if (needNewTab) {
      open(`${origin}/yst-iwork-alpha/bbs/square/${squareId}`);
    } else {
      history.push(`/bbs/square/${squareId}`);
      window.scrollTo(0, 0);
    }
  };
}

// dayjs
import dayjs from 'dayjs';
import { useDebounceFn as oldUseDebounceFn } from 'ahooks';
import { DebounceOptions } from 'ahooks/lib/useDebounce/debounceOptions';
var relativeTime = require('dayjs/plugin/relativeTime');
var config = {
  thresholds: [
    { l: 's', r: 1 },
    { l: 'm', r: 1 },
    { l: 'mm', r: 59, d: 'minute' },
    { l: 'h', r: 1 },
    { l: 'hh', r: 23, d: 'hour' },
    { l: 'd', r: 1 },
    { l: 'dd', r: 29, d: 'day' },
    { l: 'M', r: 1 },
    { l: 'MM', r: 11, d: 'month' },
    { l: 'y' },
    { l: 'yy', d: 'year' },
  ],
};
require('dayjs/locale/zh-cn');
dayjs.extend(relativeTime, config).locale('zh-cn');
export { dayjs };

// 500 ms 的防抖
export function useDebounceFn<T = any>(fn: T, options?: DebounceOptions) {
  return oldUseDebounceFn<T>(fn, { wait: 500, ...options });
}

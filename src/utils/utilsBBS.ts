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
 * 传入 squareId(typeId) 和
 */
export function useBBSGotoSquarePost() {
  const history = useHistory();
  return (threadId: number, squareId: number) => {
    history.push(`/bbs/square/${squareId}/${threadId}`);
    window.scrollTo(0, 0);
  };
}

/**
 * 传入 squareId(typeId) 和
 */
export function useBBSGotoMyPost() {
  const history = useHistory();
  return (threadId: number) => {
    history.push(`/bbs/mine/${threadId}`);
    window.scrollTo(0, 0);
  };
}

/**
 * 传入 square id
 */
export function useBBSGotoSquare() {
  const history = useHistory();
  return (squareId: number, needNewTab = true) => {
    if (needNewTab) {
      open(`${origin}/yst-iwork-alpha/bbs/square/${squareId}`);
    } else {
      history.push(`/bbs/square/${squareId}`);
      window.scrollTo(0, 0);
    }
  };
}

import { createFromIconfontCN } from '@ant-design/icons';
import { useHistory } from 'umi';

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
 * 传入 消息 对象即可
 */
export function useBBSGotoSquarePost() {
  const history = useHistory();
  return (postItem: any) => {
    history.push(`/bbs/square/${postItem.typeId}/${postItem.threadId}`);
  };
}

import React from 'react';
import styles from './RightCard.less';

import { IconFont, useBBSGotoPost } from '@/utils/utilsBBS';
import type { Post } from '../api';

const RightCard: React.FC<{ title: string; list: Post[] }> = React.memo(({ title, list }) => {
  const goPost = useBBSGotoPost();
  return (
    <div className={styles.rightCard}>
      <div className={styles.rect} />

      <div className={styles.top}>
        <div className={styles.title}>{title}</div>
        {/* <span onClick={onClickMore}>更多</span> */}
      </div>

      <div className={styles.listContainer}>
        {list.map(({ title, loveCount, typeId, threadId }) => {
          return (
            <div className={styles.listItem} key={threadId}>
              <a className={styles.listItemTitle} onClick={() => goPost(threadId)}>
                {title}
              </a>
              <IconFont type="iconzan" />
              {loveCount && (
                <span className={styles.count}>{loveCount > 99 ? '99+' : loveCount}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default RightCard;

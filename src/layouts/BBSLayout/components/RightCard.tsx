import React from 'react';
import styles from './RightCard.less';

export type typeRightCard = {
  title: string;
  list?: { title?: string; good?: boolean; count?: number }[];
};
const RightCard: React.FC<typeRightCard> = React.memo(({ title, list }) => {
  return (
    <div className={styles.rightCard}>
      <div className={styles.rect} />

      <div className={styles.top}>
        <div className={styles.title}>{title}</div>
        <span>更多</span>
      </div>

      <div className={styles.listContainer}>
        {list?.map(({ title, good, count }) => {
          return (
            <div className={`${styles.listItem} ${good && styles.yello}`}>
              <span className={styles.listItemTitle}>{title}</span>
              {count && <span className={styles.count}>{count > 99 ? '99+' : count}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default RightCard;

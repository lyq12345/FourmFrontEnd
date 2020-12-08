import { dayjs, IconFont, useBBSGotoSquare } from '@/utils/utilsBBS';
import Avatar from 'antd/lib/avatar/avatar';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'umi';

import styles from './style.less';
import editPNG from '@/assets/bbs/icon/edit.png';
import Comments from '../components/Comments';
import { PostDetail, requestPostDetail, requestShare, requestLove } from '../api';
import { useDebounceFn } from '@/utils/utilsBBS';
import { globalFormObj, isPostCreatorModalVisible } from '@/layouts/BBSLayout/store';
import { useRecoilState } from 'recoil';

const Post: React.FC = React.memo(() => {
  const { postId } = useParams<{ postId: string }>();

  const [data, setData] = useState<PostDetail>({} as PostDetail);
  useEffect(() => {
    requestPostDetail(+postId).then((res) => {
      setData(res.data);
    });
  }, [postId]);

  const { run: handleFocusClick } = useDebounceFn(() => {
    requestShare(+postId, +!data.isShare).then((_) => {
      setData((d) => ({ ...d, isShare: +!d.isShare as 0 | 1 }));
    });
  });

  const { run: handleLoveClick } = useDebounceFn(() => {
    requestLove(+data.postId, +!data.isLove).then((res) => {
      setData((d) => ({ ...d, isLove: +!d.isLove as 0 | 1, loveCount: res.data }));
    });
  });

  // 发帖对话框
  const [isModalVisible, setIsModalVisible] = useRecoilState(isPostCreatorModalVisible);
  const [oldFormObject, setOldFormObject] = useRecoilState(globalFormObj);
  const handleEditClick = useCallback(() => {
    setOldFormObject(data);
    setIsModalVisible(true);
  }, [data]);

  const go = useBBSGotoSquare();
  const handleTypeClick = useCallback(() => {
    go(data.typeId);
  }, [data]);

  return (
    <div className={styles['container']}>
      <p className={styles['title']}>{data.title}</p>
      <div className={styles['under-title']}>
        <Avatar size={41.73} src={data?.avatarPath} />
        <div>
          <p>{data?.createName}</p>
          <p>{dayjs(data.createDate).fromNow()}</p>
        </div>
        <div className={styles['flex-grow']}></div>
        <div
          className={`${styles['focus']} ${
            data.isShare ? styles['focus-on'] : styles['focus-off']
          }`}
          onClick={handleFocusClick}
        ></div>
      </div>
      <p className={styles['content']}>{data?.content}</p>
      <div className={styles['action']}>
        <span onClick={handleTypeClick}>{data?.typeName}</span>
        <span onClick={handleEditClick}>编辑</span>
        <img src={editPNG} alt="e" />
      </div>
      <p>最后修改时间 {dayjs(data.lastUpdateDate).format('YYYY-MM-DD HH:mm')}</p>

      <div
        className={`${styles['good']} ${data.isLove ? styles['good-on'] : styles['good-off']}`}
        onClick={handleLoveClick}
      >
        <IconFont type="iconzan" />
        <br />
        <span>{data.loveCount}</span>
      </div>

      <Comments
        id={+postId}
        style={{ transform: 'translateX(-20px)', marginTop: 24 }}
        postIdOfThread={data.postId}
        typeId={data.typeId}
      />
    </div>
  );
});

export default Post;

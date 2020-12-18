import editPNG from '@/assets/bbs/icon/edit.png';
import { PostEventContext } from '@/layouts/BBSLayout/store';
import { dayjs, IconFont, useBBSGotoSquare, useDebounceFn } from '@/utils/utilsBBS';
import { useLocalStorageState, useToggle } from 'ahooks';
import { Skeleton } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'umi';
import { BbsUserInfo, PostDetail, requestLove, requestPostDetail, requestShare } from '../api';
import BBSLoading from '../components/BBSLoading';
import Comments from '../components/Comments';
import PicturePart from '../components/NormalPost/PicturePart';
import styles from './style.less';

const Post: React.FC = React.memo(() => {
  const { postId } = useParams<{ postId: string }>();

  const [data, setData] = useState<PostDetail>({} as PostDetail);
  const [trigger, { toggle: refresh }] = useToggle();
  useEffect(() => {
    setLoading(true);
    requestPostDetail(+postId)
      .then((res) => {
        if (res.success) {
          setData(res.data);
        }
      })
      .finally(() => setLoading(false));
  }, [postId, trigger]);

  // 判断是不是自己的帖子
  const [isMinePost, setIsMinePost] = useState(false);
  const [bbsUserInfo] = useLocalStorageState<BbsUserInfo>('bbsUserInfo');
  useEffect(() => {
    setIsMinePost(bbsUserInfo?.id === data.createId);
    // setIsMinePost(true);
  }, [data]);

  const { run: handleFocusClick } = useDebounceFn(() => {
    requestShare(+postId, +!data.isShare).then((res) => {
      if (res.success) {
        setData((d) => ({ ...d, isShare: +!d.isShare as 0 | 1 }));
      }
    });
  });

  const { run: handleLoveClick } = useDebounceFn(() => {
    requestLove(+data.postId, +!data.isLove).then((res) => {
      if (res.success) {
        setData((d) => ({ ...d, isLove: +!d.isLove as 0 | 1, loveCount: res.data }));
      }
    });
  });

  // 发帖对话框
  const postEvent$ = useContext(PostEventContext);
  postEvent$?.useSubscription((strOrArray) => {
    let val, args;
    if (strOrArray instanceof Array) {
      val = strOrArray[0];
      args = strOrArray.slice(1);
    } else {
      val = strOrArray;
      args = [];
    }

    switch (val) {
      case 'success':
        refresh();
        break;
      default:
        break;
    }
  });
  const handleEditClick = useCallback(() => {
    postEvent$?.emit(['redoing', data]);
  }, [data]);

  const go = useBBSGotoSquare();
  const handleTypeClick = useCallback(() => {
    go(data.typeId);
  }, [data]);

  const [loading, setLoading] = useState(true);

  return (
    <BBSLoading loading={loading}>
      <div className={styles['container']}>
        {loading ? (
          <Skeleton avatar paragraph={{ rows: 6 }} />
        ) : (
          <>
            {/* <p className={styles['title']} dangerouslySetInnerHTML={{ __html: data.title }}></p> */}
            <p className={styles['title']}>{data.title}</p>
            <div className={styles['under-title']}>
              <Avatar size={41.73} src={data?.avatarPath} />
              <div>
                <p>{data?.createName}</p>
                <p>{dayjs(data.createDate).fromNow()}</p>
              </div>
              <div className={styles['flex-grow']} />
              {!isMinePost && (
                <div
                  className={`${styles['focus']} ${
                    data.isShare ? styles['focus-on'] : styles['focus-off']
                  }`}
                  onClick={handleFocusClick}
                ></div>
              )}
            </div>
            {/* <p className={styles['content']} dangerouslySetInnerHTML={{ __html: data.content }}></p> */}
            <p className={styles['content']}>{data.content}</p>

            <PicturePart type={1} picList={data.attach} largePicList={data.attachsBig} />

            <div className={styles['action']}>
              <span onClick={handleTypeClick}>{data?.typeName}</span>
              {isMinePost && (
                <>
                  <span onClick={handleEditClick}>编辑</span>
                  <img src={editPNG} alt="e" onClick={handleEditClick} />
                </>
              )}
            </div>
            <p>最后修改时间 {dayjs(data.lastUpdateDate).format('YYYY-MM-DD HH:mm')}</p>

            <div
              className={`${styles['good']} ${
                data.isLove ? styles['good-on'] : styles['good-off']
              }`}
              onClick={handleLoveClick}
            >
              <IconFont type="iconzan" />
              <br />
              <span>{data.loveCount}</span>
            </div>
          </>
        )}
      </div>
      <Comments
        id={+postId}
        style={{ height: 'auto', paddingBottom: 30, borderRadius: 0 }}
        wrapperReplyStyle={{ position: 'fixed', bottom: 0, borderRadius: 0 }}
        postIdOfThread={data.postId}
        typeId={data.typeId}
      />
    </BBSLoading>
  );
});

export default Post;

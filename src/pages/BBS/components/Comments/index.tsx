import { useClickAway, useInViewport, useUpdateEffect } from 'ahooks';
import { Button, Input, message, Spin } from 'antd';
import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { Comment, requestLove, requestComments, requestReply } from '../../api';
import CommentComponent, { CommentProps } from './Comment';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#ff5000' }} spin />;

import styles from './style.less';
import noComments from '@/assets/bbs/noComments.png';
import { useDebounceFn } from '@/utils/utilsBBS';
import BBSLoading from '../BBSLoading';

export default React.memo<{
  id: number;
  typeId: number;
  postIdOfThread: number;
  style?: CSSProperties;
}>(({ id, style, typeId, postIdOfThread }) => {
  const [data, setData] = useState<Comment[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    requestComments(id, page)
      .then((res) => {
        if (page === 1) {
          setData(res.data.posts);
        } else {
          setData((c) => c.concat(res.data.posts));
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, id]);

  // 无限加载
  const loadRef = useRef(null);
  const inViewPort = useInViewport(loadRef);
  useUpdateEffect(() => {
    if (inViewPort) {
      setPage((c) => c + 1);
    }
  }, [inViewPort]);

  const handleGoodClick: CommentProps['onGoodClick'] = useCallback(
    (status: 0 | 1, postId: number) => {
      return new Promise<{ status: 0 | 1; loveCount: number }>((resolve, reject) => {
        requestLove(postId, status)
          .then((res) => {
            resolve({ status, loveCount: +res.data });
          })
          .catch((e) => reject(e));
      });
    },
    [],
  );

  const handleCommentClick: CommentProps['onCommentClick'] = useCallback((comment) => {
    setTargetComment(comment);
    InputRef?.current?.focus();
  }, []);
  // 默认回复原帖
  const [targetComment, setTargetComment] = useState<Comment | null>(null);
  // 点击其它地方恢复回复原帖
  const handleBgClick = useCallback(() => {
    setTargetComment(null);
  }, []);
  const handleReplyBgClick = useCallback((e) => {
    e.stopPropagation();
  }, []);
  const commentsRef = useRef(null);
  useClickAway(() => {
    setTargetComment(null);
  }, commentsRef);

  const [value, setValue] = useState('');
  const handleValueChange = useCallback((v) => {
    setValue(v.target.value);
  }, []);
  const { run: handleSubmit } = useDebounceFn(() => {
    console.log('回复楼层', targetComment?.floorNumber);
    requestReply(value, id, Number(targetComment?.postId ?? postIdOfThread), typeId).then((res) => {
      setValue('');
      setPage(1);
      message.success('评论成功');
    });
  });

  // Input Ref 获取焦点用
  const InputRef = useRef(null);

  return (
    <div className={styles['comments']} onClick={handleBgClick} ref={commentsRef} style={style}>
      <p className={styles['title']}>共{data.length}条评论</p>
      <div className={styles['comment-container']}>
        {data.map((v) => (
          <CommentComponent
            key={v.postId}
            comment={v}
            onGoodClick={handleGoodClick}
            onCommentClick={handleCommentClick}
          />
        ))}
        {!data.length && (
          <div className={styles['noComments']}>
            {loading ? (
              <BBSLoading loading={loading} />
            ) : (
              <>
                <img src={noComments} alt="noComments" width={130} />
                <span>
                  暂无评论，<span onClick={() => InputRef?.current?.focus()}>写留言</span>
                </span>
              </>
            )}
          </div>
        )}
        <div ref={loadRef} style={{ height: 1 }}></div>
      </div>
      <div className={styles['reply']} onClick={handleReplyBgClick}>
        <Input
          className={styles['input']}
          placeholder={!targetComment ? '回复帖子' : `回复${targetComment.floorNumber}`}
          value={value}
          onChange={handleValueChange}
          ref={InputRef}
        />
        <Button
          className={`${styles['submit']} ${!value.length && styles['disabled']}`}
          onClick={handleSubmit}
          disabled={!value.length}
        >
          发送
        </Button>
      </div>
    </div>
  );
});

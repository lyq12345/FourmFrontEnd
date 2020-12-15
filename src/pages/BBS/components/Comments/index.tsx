import noComments from '@/assets/bbs/noComments.png';
import { useDebounceFn } from '@/utils/utilsBBS';
import { useClickAway, useInViewport, useKeyPress, useUpdateEffect } from 'ahooks';
import { Button, Input, message } from 'antd';
import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { Comment, requestComments, requestLove, requestReply } from '../../api';
import BBSLoading from '../BBSLoading';
import CommentComponent, { CommentProps } from './Comment';
import styles from './style.less';

export default React.memo<{
  id: number;
  typeId: number;
  postIdOfThread: number;
  style?: CSSProperties;
  wrapperReplyStyle?: CSSProperties;
  onTotalChange?: (value: number) => void;
}>(({ id, style, typeId, postIdOfThread, wrapperReplyStyle, onTotalChange }) => {
  const [data, setData] = useState<Comment[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    onTotalChange?.(total);
  }, [total]);
  const [loading, setLoading] = useState(true);
  const [isStopLoadMore, setIsStopLoadMore] = useState(false);

  useEffect(() => {
    if (!isStopLoadMore) {
      setLoading(true);
      requestComments(id, page)
        .then((res) => {
          if (res.success) {
            // 设置无限加载的停止条件
            if (!res.data.posts?.length) {
              setIsStopLoadMore(true);
            }

            if (page === 1) {
              setData(res.data.posts);
              setTotal(res.data.total);
            } else {
              setTotal(res.data.total);
              setData((c) => c.concat(res.data.posts));
            }
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [page, id, isStopLoadMore]);

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
            if (res.success) {
              resolve({ status, loveCount: +res.data });
            }
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
      if (res.success) {
        setValue('');
        message.success('评论成功');

        // 更新： 刷新数据到第一条
        setData((d) => [res.data, ...d]);
        setTotal((t) => t + 1);
      }
    });
  });

  // Input Ref 获取焦点用
  const InputRef = useRef(null);

  return (
    <div className={styles['comments']} onClick={handleBgClick} ref={commentsRef} style={style}>
      <p className={styles['title']}>共{total}条评论</p>
      <div className={styles['comment-container']}>
        {data?.map((v, i) => (
          <CommentComponent
            key={v.postId}
            comment={v}
            onGoodClick={handleGoodClick}
            onCommentClick={handleCommentClick}
            hasDivider={i !== data.length - 1}
          />
        ))}
        {loading ? (
          <div style={{ textAlign: 'center' }}>
            <BBSLoading loading={loading} />
          </div>
        ) : (
          !data?.length && (
            <div className={styles['noComments']}>
              <img src={noComments} alt="noComments" width={130} />
              <span>
                暂无评论，<span onClick={() => InputRef?.current?.focus()}>写留言</span>
              </span>
            </div>
          )
        )}
        <div ref={loadRef} style={{ height: 1 }}></div>
      </div>
      <div className={styles['reply']} onClick={handleReplyBgClick} style={wrapperReplyStyle}>
        <Input
          className={styles['input']}
          placeholder={!targetComment ? '回复帖子' : `回复${targetComment.floorNumber}楼`}
          value={value}
          onChange={handleValueChange}
          ref={InputRef}
          onPressEnter={handleSubmit}
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

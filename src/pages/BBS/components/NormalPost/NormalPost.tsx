import { dayjs, IconFont, useBBSGotoPost, useBBSGotoSquare, useDebounceFn } from '@/utils/utilsBBS';
import { Avatar, Modal } from 'antd';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Post, requestLove } from '../../api';
import Comments from '../Comments';
import styles from './NormalPost.less';
import PicturePart from './PicturePart';

export type NormalPostProps = {
  post: Post;
  isInnerPrimaryColorUsed?: boolean;
  id?: string;
  isSquareLinkDisabled?: boolean;
};

export default React.memo<NormalPostProps>(
  ({ post, isInnerPrimaryColorUsed = true, id, isSquareLinkDisabled = false }) => {
    const [loveCount, setLoveCount] = useState(post.loveCount);
    const [isLove, setIsLove] = useState(post.isLove);

    const { run: handleGoodClick } = useDebounceFn(() => {
      requestLove(post.postId, 1 - isLove).then((res) => {
        if (res.success) {
          setLoveCount(res.data);
          setIsLove(1 - isLove);
        }
      });
    });

    const [replyCount, setReplyCount] = useState(post.replyCount);
    const handleTotalChange = useCallback((total) => {
      setReplyCount(total);
    }, []);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleCommentClick = useCallback(() => {
      setIsModalVisible(true);
    }, []);

    const go = useBBSGotoPost();
    const goSquare = useBBSGotoSquare();

    // 高度控制是否显示按钮
    const contentRef = useRef<HTMLParagraphElement>(null);
    const [isOverflow, setIsOverflow] = useState(false);
    useLayoutEffect(() => {
      // 一行 26px
      const dom = contentRef.current;
      if (dom) {
        const computedStyle = getComputedStyle(dom);
        const lineCount = Math.floor(
          +computedStyle.height.replace('px', '') / +computedStyle.lineHeight.replace('px', ''),
        );
        if (lineCount > 4) {
          setIsOverflow(true);
        }
      }
    }, [contentRef]);

    return (
      <div className={styles['container']} id={id}>
        <div className={styles['top']}>
          <Avatar size={50} src={post.avatarPath} className={styles['avatar']} />
          <div className={styles['center']}>
            <p className={styles['author']}>{post.createName}</p>

            <p
              className={`${styles['type']} ${isSquareLinkDisabled ? styles['type-disabled'] : ''}`}
              onClick={() => goSquare(post.typeId)}
            >
              {post.typeName}
            </p>
            <p className={styles['time']}>{dayjs(post.createDate).fromNow()}</p>
            <div className={styles['hot-area']}>
              <p
                className={styles['title']}
                onClick={() => go(post.threadId)}
                dangerouslySetInnerHTML={{ __html: post.title }}
              >
                {/* {post.title} */}
              </p>
              <p
                className={`${styles['content']} ${isOverflow ? 'line-clamp-4' : ''}`}
                ref={contentRef}
                dangerouslySetInnerHTML={{ __html: post.content }}
              >
                {/* <p className={`${styles['content']} line-clamp-5`} ref={contentRef}>
                {post.content} */}
              </p>
            </div>
          </div>
        </div>

        {isOverflow ? (
          <p style={{ textAlign: 'right' }}>
            <a onClick={() => go(post.threadId)} className={styles['go-post']}>
              查看全文
            </a>
          </p>
        ) : null}
        <PicturePart picList={post.attach} largePicList={post.attachsBig} />

        <div className={styles['action']}>
          {isLove ? (
            <IconFont
              type="iconyizan"
              className={styles['bottom-icon']}
              onClick={handleGoodClick}
              style={{ color: 'var(--bbs-primary-color)' }}
            />
          ) : (
            <IconFont type="iconzan" className={styles['bottom-icon']} onClick={handleGoodClick} />
          )}
          <span className={styles['type']} onClick={handleGoodClick}>
            赞
          </span>
          <span>{loveCount}</span>
          <IconFont
            type="iconpinglun"
            className={styles['bottom-icon']}
            onClick={handleCommentClick}
          />
          <span className={styles['type']} onClick={handleCommentClick}>
            评论
          </span>
          <span>{replyCount}</span>
        </div>

        {/* 评论 */}
        <Modal
          visible={isModalVisible}
          width={670}
          modalRender={() => (
            <div
              style={
                isInnerPrimaryColorUsed
                  ? { pointerEvents: 'initial', '--bbs-primary-color': '#ff5000' }
                  : { pointerEvents: 'initial' }
              }
            >
              <Comments
                id={post.threadId}
                postIdOfThread={post.postId}
                typeId={post.typeId}
                onTotalChange={handleTotalChange}
              />
            </div>
          )}
          maskClosable
          destroyOnClose
          onCancel={() => setIsModalVisible(false)}
        ></Modal>
      </div>
    );
  },
);

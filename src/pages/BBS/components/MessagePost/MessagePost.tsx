import { dayjs, useDebounceFn, useBBSGotoPost, formatTextArea } from '@/utils/utilsBBS';
import { Avatar, Input, message } from 'antd';
import React, { useState } from 'react';
import { Message, requestReply } from '../../api';
import styles from './MessagePost.less';
import Thumb from '@/assets/bbs/icon/thumb.png';

export type MessagePostProps = {
  message1: Message;
};

export default React.memo<MessagePostProps>(({ message1 }) => {
  const [replyVisible, setReplyVisible] = useState(false);
  const [inputContent, setContent] = useState('');

  const { run: handleReply } = useDebounceFn(() => {
    //回复
    setReplyVisible((visible) => {
      return !visible;
    });
  });
  const handleSend = () => {
    if (inputContent === '') {
      message.warning('请输入评论内容');
      return;
    } else {
      requestReply(inputContent, message1.threadId, message1.postId, message1.typeId).then(
        (res) => {
          if (res.success === 1) {
            setContent('');
            message.success('回复成功');
            setReplyVisible(false);
          }
        },
      );
    }
  };

  const go = useBBSGotoPost();

  return (
    <div className={styles['container']}>
      <div className={styles['top']}>
        <Avatar src={message1.avatarPath} size={54} className={styles['avatar']} />
        <div className={styles['center']}>
          <p className={styles['name']}>{message1.createName}</p>
          <p className={styles['time']}>{dayjs(message1.createDate).fromNow()}</p>
          <div className={styles['main']}>
            <p className={styles['reply-content']}>
              <span
                dangerouslySetInnerHTML={{
                  __html: formatTextArea(message1.content),
                }}
              ></span>
              {/* {message1.infoType === 103 ? (
                <img className={styles['thumb']} src={Thumb}></img>
              ) : null} */}
              {message1.infoType === 103 ? (
                <img className={styles['thumb']} src={Thumb}></img>
              ) : null}
            </p>
            <div className={styles['origin-container']}>
              <p
                className={`${styles['origin-content']} line-clamp-2`}
                onClick={() => go(message1.threadId)}
                dangerouslySetInnerHTML={{
                  __html: formatTextArea(message1.contentparent),
                }}
              ></p>
            </div>
          </div>
          {message1.infoType === 103 ? null : (
            <div className={styles['bottom']}>
              <p className={styles['huifuta']} onClick={handleReply}>
                回复ta
              </p>
              {replyVisible ? (
                <div className={styles['reply']}>
                  <div className={styles['input-container']}>
                    <Input
                      className={styles['input']}
                      placeholder={'回复TA'}
                      bordered={false}
                      value={inputContent}
                      onChange={(e) => {
                        setContent(e.target.value);
                      }}
                    />
                  </div>
                  <span className={styles['send']} onClick={handleSend}>
                    发送
                  </span>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

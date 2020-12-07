import request from '@/utils/request';

type Res<TData> = {
  success: number;
  message: string;
  code: string;
  data: TData;
};
type Response<TData> = Promise<Res<TData>>;

/**
 * 我的发帖 5个
 */
export function requestMyPosts5(): Promise<{
  data: { total: number; pageCount: number; threads: Post[] };
}> {
  return request.get('/BbsMain/GetThreadsMyPc', {
    params: {
      pageIndex: 1,
      pageSize: 5,
    },
  });
}
/**
 * 我的关注 5个
 */
export function requestSharePosts5(): Promise<
  Res<{ threads: Post[]; total: number; pageCount: number }>
> {
  return request.get('/BbsMain/GetThreadSharePc', {
    params: {
      pageIndex: 1,
      pageSize: 5,
    },
  });
}

/**
 * 消息数量
 */
export function requestCount(): Promise<Res<number>> {
  return request.get('/BbsMain/GetMessageCount');
}

/**
 * 帖子
 *
 * 论坛列表-最新/最热/我的发帖/我的关注
 */
export type Post = {
  typeName: string;
  typeId: number;
  readCount: number;
  replyCount: number;
  createDate: number;
  lastUpdateDate: number;
  createId: number;
  createName: string;
  avatarPath: string;
  loveCount: number;
  title: string;
  content: string;
  threadId: number;
  attach: [];
  attachBig: [];
};
export function requestLatestPosts(
  pageIndex: number,
): Response<{ total: number; pageCount: number; threads: Post[] }> {
  return request.get('/BbsMain/GetThreads', {
    params: {
      pageIndex,
    },
  });
}
export function requestHottestPosts(
  pageIndex: number,
): Response<{ total: number; pageCount: number; threads: Post[] }> {
  return request.get('/BbsMain/GetThreadsHot', {
    params: {
      pageIndex,
    },
  });
}
export function requestMyPosts(
  pageIndex: number,
): Response<{ total: number; pageCount: number; threads: Post[] }> {
  return request.get('/BbsMain/GetThreadsMy', {
    params: {
      pageIndex,
    },
  });
}

/**
 * 广场列表类型
 */
export type PostType = {
  id: number;
  parentId: number;
  name: string;
  description: string;
  readCount: string;
  icon: string;
};
export function requestTypeList(pageIndex: number): Response<PostType[]> {
  return request.get('/BbsMain/GetTypeList', { params: { pageIndex } });
}
export function requestType(): Promise<Res<PostType[]>> {
  return request.get('/BbsMain/GetType');
}

/**
 * 创建帖子 参数
 */
export type CreatePostParams = {
  title: string;
  content: string;
  typeId: number;
  threadId: number; // 新建传0
  attach?: string[];
};
export function requestCreatePost(params: CreatePostParams): Promise<Res<String>> {
  return request.post('/BbsMain/CreateThread', {
    data: params,
  });
}

/**
 * 论坛正文
 */
export type PostDetail = Post & {
  lastReplyId: string;
  lastReplyName: string;
  threadId: number;
  postId: number;
  isShare: 0 | 1;
  isLove: 0 | 1;

  attachBig: never;
};

export type Comment = {
  postId: string;
  createId: number;
  createDate: number;
  createName: string;
  content: string;
  loveCount: number;
  floorNumber: string;
  avatarPath: string;
  isLove: 0 | 1;
  contentparent: string;
};
export function requestComments(
  id: number,
  pageIndex: number,
): Response<{ pageCount: number; total: number; posts: Comment[] }> {
  return request.get('/BbsMain/GetPosts', {
    params: {
      id,
      pageIndex,
    },
  });
}

/**
 *
 * @param status 0取消 1添加
 * @param postId CommentId
 */
export function requestCommentLove(status: 0 | 1, postId: number): Response<string> {
  return request.get('/BbsMain/SetPostLove', {
    params: {
      status,
      postId,
    },
  });
}

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
  postId: number;
  isLove: 0 | 1;
  attach: [];
  attachBig: [];
};

export type Message = {
  postId: string;
  createDate: number;
  createId: number;
  createName: string;
  content: string;
  loveCount: number;
  floorNumber: number;
  avatarPath: string;
  isLove: number;
  contentparent: string;
  infoType: number;
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
export function requestSharePosts(
  pageIndex: number,
): Response<{ total: number; pageCount: number; threads: Post[] }> {
  return request.get('/BbsMain/GetThreadShare', {
    params: { pageIndex },
  });
}
export function requestTypePosts(
  pageIndex: number,
  typeId: number,
): Response<{
  total: number;
  pageCount: number;
  threads: Post[];
  forumId: number;
  forumName: string;
  description: string;
  readCount: number;
}> {
  return request.get('/BbsMain/GetThreadsType', {
    params: { pageIndex, typeId },
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
  isShare: 0 | 1;
  attachBig: never;
};
export function requestPostDetail(id: number): Response<PostDetail> {
  return request.get('/BbsMain/GetThread', {
    params: {
      id,
    },
  });
}
export function requestShare(threadId: number, status: number): Response<string> {
  return request.get('/BbsMain/SetThreadShare', {
    params: {
      threadId,
      status,
    },
  });
}
export function requestLove(postId: number, status: number): Response<number> {
  return request.get('/BbsMain/SetPostLove', {
    params: {
      postId,
      status,
    },
  });
}

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
export function requestReply(
  content: string,
  threadId: number,
  postId: number,
  typeId: number,
): Response<string> {
  return request.post('/BbsMain/Repaly', {
    data: {
      content,
      threadId,
      postId,
      typeId,
    },
  });
}

// 我的消息
export function GetMessage(
  pageIndex: number,
): Response<{
  postId: string;
  createDate: number;
  createId: number;
  createName: string;
  content: string;
  loveCount: number;
  floorNumber: number;
  avatarPath: string;
  isLove: number;
  contentparent: string;
  infoType: number;
}> {
  return request.get('/BbsMain/GetMessage', {
    params: {
      pageIndex,
    },
  });
}

export type BbsUserInfo = {
  id: number;
  name: string;
  avatar: string;
  threadCount: string;
};
export function requestUserInfo(): Response<BbsUserInfo> {
  return request.get('/BbsMain/GetUserInfo');
}

export function requestComment(postId: number): Response<Comment> {
  return request.get('/BbsMain/GetPostView', {
    params: {
      postId,
    },
  });
}

import request from '@/utils/request';

export type PostType = {
  /**
   * 分类Id
   */
  id: number;
  /**
   * 分类名称
   */
  name: string;
};

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

export function requestType(): Promise<{ data: PostType[] }> {
  return request.get('/BbsMain/GetType');
}

export function requestMyPosts(): Promise<{
  data: { total: number; pageCount: number; threads: Post[] };
}> {
  return request.get('/BbsMain/GetThreadsMyPc', {
    params: {
      pageIndex: 1,
      pageSize: 5,
    },
  });
}

export function requestSharePosts(): Promise<{
  data: {
    threads: Post[];
    total: number;
    pageCount: number;
  };
}> {
  return request.get('/BbsMain/GetThreadSharePc', {
    params: {
      pageIndex: 1,
      pageSize: 5,
    },
  });
}

export function requestCount(): Promise<{ data: number }> {
  return request.get('/BbsMain/GetMessageCount');
}

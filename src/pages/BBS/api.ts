import request from '@/utils/request';

type Res<TData> = {
  success: number;
  message: string;
  code: string;
  data: TData;
};

export type PostType = {
  id: number;
  parentId: number;
  name: string;
  description: string;
  readCount: string;
  icon: string;
};
export function requestType(pageIndex: number): Promise<Res<PostType[]>> {
  return request.get('/BbsMain/GetTypeList', { params: { pageIndex } });
}

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

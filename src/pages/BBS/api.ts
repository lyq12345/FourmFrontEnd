import request from '@/utils/request';

export type PostType = {
  id: number;
  parentId: number;
  name: string;
  description: string;
  readCount: string;
  icon: string;
};

export function requestType(): Promise<{ data: PostType[] }> {
  return request.get('/BbsMain/GetTypeList');
}

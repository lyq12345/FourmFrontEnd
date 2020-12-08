import { atom } from 'recoil';

export const isPostCreatorModalVisible = atom({
  key: 'isPostCreatorModalVisible',
  default: false,
});

export const globalFormObj = atom({
  key: 'globalFormObj',
  default: undefined,
});

import React, { useState, useEffect, useCallback } from 'react';
import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { UploadProps } from 'antd/es/upload/interface';

import styles from './ImageUpload.less';
import request from '@/utils/request';

/**
 * TODO: value，默认值，编辑
 */
export default React.memo<{ value: any; onChange: (fileList: any[]) => void }>(
  ({ value, onChange }) => {
    const handleChange: UploadProps['onChange'] = ({ fileList }) => {
      // resolve url
      fileList.forEach((upLoadFile) => {
        if (upLoadFile.response && !upLoadFile.url) {
          upLoadFile.url = upLoadFile.response.data;
        }
      });

      onChange(fileList);
    };

    const customRequest: UploadProps['customRequest'] = (options) => {
      const formData = new FormData();
      formData.append('files', options.file);

      request
        .post('/BbsMain/UpLoad', {
          data: formData,
        })
        .then((res) => {
          options.onSuccess(res, options.file);
        })
        .catch(() => {
          options.onError(new Error('上传图片出错'));
        });
    };

    return (
      <Upload
        listType="picture-card"
        fileList={value}
        onChange={handleChange}
        customRequest={customRequest}
        className={styles.upload}
      >
        {value.length >= 9 ? null : <PlusOutlined />}
      </Upload>
    );
  },
);

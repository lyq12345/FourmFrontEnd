import { useBBSGotoSquare } from '@/utils/utilsBBS';
import { useInViewport, useUpdateEffect } from 'ahooks';
import React from 'react';
import * as api from '../api';
import BBSLoading from '../components/BBSLoading';

const SquareHome: React.FC = React.memo(() => {
  const [page, setPage] = React.useState<number>(1);
  const [dataTypeList, setDataTypeList] = React.useState<api.PostType[]>([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    api
      .requestTypeList(page)
      .then((res) => {
        setDataTypeList((c) => c.concat(res.data ?? []));
      })
      .finally(() => setLoading(false));
  }, [page]);

  // 动态加载
  const inViewPort = useInViewport(() => document.querySelector('#bbs-footer'));
  useUpdateEffect(() => {
    if (inViewPort) {
      setPage((c) => c + 1);
    }
  }, [inViewPort]);

  const go = useBBSGotoSquare();
  return (
    <div>
      {dataTypeList.map(({ name, id, description, readCount, shortName, color, total }) => {
        return (
          <div
            style={{
              width: 670,
              height: 122,
              padding: '20px 15px',
              display: 'flex',
              alignItems: 'center',
              marginBottom: 12,
              background: '#fff',
              borderRadius: 4,
              cursor: 'pointer',
            }}
            key={id}
            onClick={() => {
              go(id);
            }}
          >
            <div
              style={{
                width: 82,
                height: 82,
                objectFit: 'contain',
                marginRight: 9,
                background: color,
                fontSize: `${58 / shortName.length}px`,
                fontWeight: 600,
                color: 'white',
                lineHeight: '82px',
                textAlign: 'center',
              }}
            >
              {shortName}
            </div>
            <div
              style={{
                height: '100%',
                width: 543,
                display: 'flex',
                flexFlow: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <p style={{ fontSize: 16, lineHeight: 1, color: '#333', fontWeight: '500' }}>
                {name}
              </p>
              <p
                style={{
                  color: '#333',
                  lineHeight: '20px',
                  height: 40,
                }}
                className="line-clamp-2"
              >
                {description}
              </p>
              <p
                style={{ fontSize: 12, lineHeight: 1, color: '#666' }}
              >{`${readCount}浏览 帖子数${total}`}</p>
            </div>
          </div>
        );
      })}
      <div style={{ textAlign: 'center' }}>
        <BBSLoading loading={loading} />
      </div>
    </div>
  );
});

export default SquareHome;

import { useBBSGotoSquare } from '@/utils/utilsBBS';
import React from 'react';
import * as api from '../api';

const SquareHome: React.FC = React.memo(({ children }) => {
  const [dataTypeList, setDataTypeList] = React.useState<api.PostType[]>([]);
  React.useEffect(() => {
    api.requestType().then((res) => {
      setDataTypeList(res.data ?? []);
    });
  }, []);

  const go = useBBSGotoSquare();
  return (
    <div>
      {dataTypeList.map(({ name, id, icon, description, readCount }) => {
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
            <img
              style={{
                width: 82,
                height: 82,
                objectFit: 'contain',
                marginRight: 9,
              }}
              src={icon}
            />
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
              <p style={{ fontSize: 12, lineHeight: 1, color: '#666' }}>{`${readCount}浏览`}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default SquareHome;

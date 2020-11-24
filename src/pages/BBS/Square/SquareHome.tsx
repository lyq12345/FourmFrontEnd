import React from 'react';
import * as api from './api';

const SquareHome: React.FC = React.memo(({ children }) => {
  const [dataTypeList, setDataTypeList] = React.useState<api.PostType[]>([]);
  React.useEffect(() => {
    api.requestType().then((res) => {
      setDataTypeList(res.data ?? []);
    });
  }, []);
  return (
    <div>
      {dataTypeList.map(({ name, id }) => {
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
            }}
            key={id}
          >
            <div
              style={{
                width: 82,
                height: 82,
                lineHeight: '82px',
                textAlign: 'center',
                backgroundColor: 'red',
              }}
            >
              {name.slice(0, 2)}
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default SquareHome;

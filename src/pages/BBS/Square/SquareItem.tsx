import React from 'react';
import { useParams } from 'umi';

const SquareItem: React.FC = React.memo(() => {
  const { squareId } = useParams();
  return squareId;
});

export default SquareItem;

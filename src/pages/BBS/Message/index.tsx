import React from 'react';
import { getMessage } from '../api';
import MessagePostList from '../components/MessagePostList';

const Index = () => {
  return (
    <div>
      <MessagePostList requestFn={getMessage} />
    </div>
  );
};

export default Index;

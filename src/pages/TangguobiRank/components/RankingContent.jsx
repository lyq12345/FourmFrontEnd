import React from 'react';
import Top10 from './Top10';
import BottomRank from './BottomRank';
//import myAvatar from '@/assets/img/avatar.jpg';


const RankingContent = (props) => {
  return (
    <div>
      <Top10 content={props.content.top10Rank} />
      <BottomRank content={props.content.otherRank} />
    </div>
  );
};

export default RankingContent;

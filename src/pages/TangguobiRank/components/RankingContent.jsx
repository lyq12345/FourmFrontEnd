import React from 'react';
import Top10 from './Top10';
import BottomRank from './BottomRank';
//import myAvatar from '@/assets/img/avatar.jpg';

const RankingContent = (props) => {
  return (
    <div>
      <Top10 content={props.content.top10Rank} year={props.year} month={props.month}/>
      <BottomRank content={props.content.otherRank} year={props.year} month={props.month} />
    </div>
  );
};

export default RankingContent;

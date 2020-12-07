import { IconFont } from '@/utils/utilsBBS';
import Avatar from 'antd/lib/avatar/avatar';
import React from 'react';
import { useParams } from 'umi';

import styles from './style.less';
import editPNG from '@/assets/bbs/icon/edit.png';

const Post: React.FC = React.memo(() => {
  const { postId } = useParams<{ postId: string }>();
  return (
    <div className={styles['container']}>
      <p className={styles['title']}>农夫山泉时隔16年再添尖叫新成员！运动就是要“尖叫”！</p>
      <div className={styles['under-title']}>
        <Avatar
          size={41.73}
          src={
            'https://cdn1.oneprofile.page/pages/avatars/323/large/Danielle_Darren-2019-255-500x500.jpg?1593718847'
          }
        />
        <div>
          <p>张三张三</p>
          <p>5分钟前</p>
        </div>
        <div className={styles['flex-grow']}></div>
        <div className={`${styles['focus']} ${styles['focus-off']}`}></div>
      </div>
      <p className={styles['content']}>
        {`销量永远不会从天而降，是农夫人日复一日，年复一年的坚持耕耘得来。他们扎根在各个角落，手搬肩扛，共同撑起了我们扎实的市场。
          在面对学校客户更换了合作品牌，失去了第一陈列位置的压力下，贵州大区的李莎坚持不懈地与客户沟通了3个月，终于客户有了转机，李莎连夜冲到现场，果断拿下主通道的七组货架、一组端架、一个堆头，当场进货400件水， 380件饮料。
          在很多偏远山区，仍然没有通公路，经销商也无法将服务覆盖，云南大区的伙伴通过联合乡村小老板，坚持将我们的产品以骡马运输的形式送到消费者身边。
          深圳30度以上的高温下，粤东大区的张耀华、魏君烈、陆湘斌身着防护服，克服闷热，开发隔离酒店，将酒店用水一箱箱送入客户指定地点。累计开发隔离酒店40家，赢取销量8000-10000箱/月。
          疫情期间，湖北大区的程关平与经销商24小时在仓库组织发货。因搬运、销售人员无法到岗，他开始了兼业代、搬运、司机的工作，每天从清晨5点到深夜12点一直奋战在岗位上。疫情期间，湖北大区的程关平与经销商24小时在仓库组织发货。因搬运、销售人员无法到岗，他开始了兼业代、搬运、司机的工作，每天从清晨5点到深夜12点一直奋战在岗位上。
        `}
      </p>
      <div className={styles['action']}>
        <span>市场问题</span>
        <span>编辑</span>
        <img src={editPNG} alt="e" />
      </div>
      <p>最后修改时间 2020-09-09 18:00</p>

      <div className={`${styles['good']} ${styles['good-on']}`}>
        <IconFont type="iconzan" />
        <br />
        <span>1231</span>
      </div>
    </div>
  );
});

export default Post;

import React, { useEffect, useState } from 'react'
import styles from './styles.less'
import read from '@/assets/img/read.png';
import praise from '@/assets/img/praise.png';
import { ListDataInfo } from '@/constants/mock'
import stick from '@/assets/img/stick.png'
import waterHealth from '@/assets/img/waterHealth.png';
import endGiveLike from '@/assets/img/endGiveLike.png';
import noGiveLike from '@/assets/img/noGiveLike.png';

const ListDetail = (props) => {
  const [praiseStatus, setPraiseStatus] = useState(false)
  const [praiseNum, setPraiseNum] = useState(199)

  const dotPraise = () => {
    if (!praiseStatus) {
      setPraiseStatus(true)
      setPraiseNum(praiseNum + 1)
    }
  }
  let { isName, isLine, isInfoIntro } = props
  return (
    <div className={styles.listDetail}>
      <div className={styles.detailComponent}>
        <p className={styles.title}>农夫山泉时隔16年再添尖叫新成员！运动就是要“尖叫”！</p>
        <div className={styles.authorAndRestsInfo}>
          <div>
            <p>发布者：刘琦</p>
            <p className={styles.readAmount}>
              <img src={read} alt="" />
              <span>阅读</span>
            </p>
            <p>2020.08.31</p>
          </div>
        </div>
        <div className={styles.imgOrVideo}>
          <img src={waterHealth} alt="" />
        </div>
        <div className={styles.contentIntroduced}>
          {
            isName ? <p className={styles.name}>饶红明</p> : <></>
          }
          {
            isLine ? <p className={styles.line}></p> : <></>
          }
          {
            isInfoIntro ? <p className={styles.companie}>农夫山泉股份有限公司/生产营运中心</p> : <></>
          }
          <div className={styles.detailInfo}>
            销量永远不会从天而降，是农夫人日复一日，年复一年的坚持耕耘得来。他们扎根在各个角落，手搬肩扛，共同撑起了我们扎实的市场。
            在面对学校客户更换了合作品牌，失去了第一陈列位置的压力下，贵州大区的李莎坚持不懈地与客户沟通了3个月，终于客户有了转机，李莎连夜冲到现场，果断拿下主通道的七组货架、一组端架、一个堆头，当场进货400件水， 380件饮料。
            在很多偏远山区，仍然没有通公路，经销商也无法将服务覆盖，云南大区的伙伴通过联合乡村小老板，坚持将我们的产品以骡马运输的形式送到消费者身边。
            深圳30度以上的高温下，粤东大区的张耀华、魏君烈、陆湘斌身着防护服，克服闷热，开发隔离酒店，将酒店用水一箱箱送入客户指定地点。累计开发隔离酒店40家，赢取销量8000-10000箱/月。
            疫情期间，湖北大区的程关平与经销商24小时在仓库组织发货。因搬运、销售人员无法到岗，他开始了兼业代、搬运、司机的工作，每天从清晨5点到深夜12点一直奋战在岗位上。
            疫情期间，湖北大区的程关平与经销商24小时在仓库组织发货。因搬运、销售人员无法到岗，他开始了兼业代、搬运、司机的工作，每天从清晨5点到深夜12点一直奋战在岗位上。
            在很多偏远山区，仍然没有通公路，经销商也无法将服务覆盖，云南大区的伙伴通过联合乡村小老板，坚持将我们的产品以骡马运输的形式送到消费者身边。
            深圳30度以上的高温下，粤东大区的张耀华、魏君烈、陆湘斌身着防护服，克服闷热，开发隔离酒店，将酒店用水一箱箱送入客户指定地点。累计开发隔离酒店40家，赢取销量8000-10000箱/月。
            疫情期间，湖北大区的程关平与经销商24小时在仓库组织发货。因搬运、销售人员无法到岗，他开始了兼业代、搬运、司机的工作，每天从清晨5点到深夜12点一直奋战在岗位上。
            疫情期间，湖北大区的程关平与经销商24小时在仓库组织发货。因搬运、销售人员无法到岗，他开始了兼业代、搬运、司机的工作，每天从清晨5点到深夜12点一直奋战在岗位上。疫情期间，湖北大区的程关平与经销商24小时在仓库组织发货。因搬运、销售人员无法到岗，他开始了兼业代、搬运、司机的工作，每天从清晨5点到深夜12点一直奋战在岗位上。


          </div>
        </div>
        <div className={praiseStatus ? `${styles.fakeLikes} ${styles.fakeLikesBackground}` : styles.fakeLikes} onClick={() => dotPraise()}>
          <p className={styles.fakeLikesImg}>
            {
              praiseStatus ?
                <img src={endGiveLike} alt="" />
                : <img src={noGiveLike} alt="" />
            }
          </p>
          <p className={styles.fakeLikesNum}>{praiseNum}</p>
        </div>
        <p className={styles.fakeLikeTost}>— 好的东西 · 值得点赞支持一下 —</p>
      </div>
    </div>
  )
}
export default ListDetail
import React, { useState, useEffect } from 'react'
import styles from './styles.less'
import ListDetail from '@/components/ListDetail'
import { GetAffairPersonView } from '@/api/common'


const Detail = (props) => {

  const [dataInfo, setDataInfo] = useState({})
  const [giveLikeNum, setGiveLikeNum] = useState()
  const { query } = props.location
  useEffect(() => {
    info()
  }, [])
  const info = () => {
    GetAffairPersonView({ id: query.id }).then(response => {
      if (response.success) {
        setDataInfo(response.data)
      }
    })
  }

  return (
    <div>
      <ListDetail id={query.id} dataInfo={dataInfo} giveLikeNum={giveLikeNum} isName isInfoIntro isLine />
    </div>
  )
}
export default Detail
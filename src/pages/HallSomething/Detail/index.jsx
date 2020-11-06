import React, { useEffect, useState } from 'react'
import styles from './styles.less'
import ListDetail from '@/components/ListDetail'
import { GetAffairView } from '@/api/common'

const Detail = (props) => {
  const [dataInfo, setDataInfo] = useState({})
  const [giveLikeNum, setGiveLikeNum] = useState()
  const { query } = props.location
  useEffect(() => {
    info()
  }, [])
  const info = () => {
    GetAffairView({ id: query.id }).then(response => {
      if (response.success) {
        setDataInfo(response.data)
      }
    })
  }

  return (
    <div>
      <ListDetail id={query.id} dataInfo={dataInfo} giveLikeNum={giveLikeNum} />
    </div>
  )
}
export default Detail
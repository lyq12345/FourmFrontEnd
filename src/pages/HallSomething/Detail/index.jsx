import React, { useEffect, useState } from 'react'
import styles from './styles.less'
import ListDetail from '@/components/ListDetail'
import { GetAffairView } from '@/api/common'

const Detail = () => {
  const [dataInfo, setDataInfo] = useState({})
  const [giveLikeNum, setGiveLikeNum] = useState()
  useEffect(() => {
    info()
  }, [])
  const info = () => {
    GetAffairView({ id: '' }).then(response => {
      if (response.success) {
        setDataInfo(response.data)
      }
    })
  }

  return (
    <div>
      <ListDetail dataInfo={dataInfo} giveLikeNum={giveLikeNum} />
    </div>
  )
}
export default Detail
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { itemUser } from '../redux/ads/adsSlice'

const ItemSidebar = ({ userId }) => {
  const dispatch = useDispatch()
  const selector = useSelector((select) => select.ads)

  useEffect(() => {
    dispatch(itemUser(userId))
  }, [dispatch, userId])

  return (
    <div className="item_sidebar_container">
      <div className="details_container">
        <h1 className="heading">Rs 91000</h1>
        <div
          className="description"
          style={{ opacity: '.6', marginTop: '12px' }}
        >
          iPhone 11 Complete Box's All Ok For Sale 0321=6016048
        </div>

        <div className="d-flex justify-content-between my-3">
          <span>Hyderabad, Sindh</span>
          <span>{/* {ad.location} - {time} */} 1 min ago</span>
        </div>
      </div>

      <div className="details_container">
        <h1 className="heading">Seller Description</h1>
      </div>
    </div>
  )
}

export default ItemSidebar

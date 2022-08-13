import { useState, useEffect } from 'react'
import { Row } from 'react-bootstrap'
import { ThreeDots } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import { getAds, reset } from '../redux/ads/adsSlice'
import { InnerCard } from './InnerCard'

const Cards = () => {
  const { ads, isLoading, filteredAds } = useSelector(
    (selector) => selector.ads
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAds())
  }, [dispatch])

  useEffect(() => {
    return () => dispatch(reset())
  }, [dispatch])

  if (isLoading) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ThreeDots color="#3a77ff" height={100} width={100} />
      </div>
    )
  }

  return (
    <div className="AdCard">
      <Row className="g-3">
        {filteredAds.length > 0 ? (
          filteredAds.map((ad) => <InnerCard ad={ad} />)
        ) : (
          <div style={{ height: '35vh' }}>
            <h1>You have no ads to show</h1>
          </div>
        )}
      </Row>
    </div>
  )
}

export default Cards

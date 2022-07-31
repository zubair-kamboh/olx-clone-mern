import moment from 'moment'
import React, { useEffect } from 'react'
import { Card, Col } from 'react-bootstrap'
import Carousel from 'react-multi-carousel'

import 'react-multi-carousel/lib/styles.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAds, reset } from '../redux/ads/adsSlice'

const ItemSlideShow = () => {
  const { ads } = useSelector((selector) => selector.ads)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAds())

    return () => dispatch(reset())
  }, [dispatch])

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  }

  return (
    <div className="details_container">
      <h4 className="title">Related ads</h4>
      <Carousel
        swipeable={false}
        draggable={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={['tablet', 'mobile']}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {ads &&
          ads.map((ad) => {
            return <InnerCard ad={ad} />
          })}
      </Carousel>
    </div>
  )
}

const InnerCard = ({ ad }) => {
  const navigate = useNavigate()

  const time = moment(ad.date).fromNow()

  const handleClick = (id) => {
    navigate(`/item/${id}`, { state: ad })
  }

  return (
    <div key={ad._id} onClick={() => handleClick(ad._id)}>
      <Card style={{ width: '100%', cursor: 'pointer' }}>
        <Card.Img
          variant="top"
          src={`../uploads/${ad.images[0]}`}
          height={200}
          style={{ objectFit: 'contain' }}
        />
        <Card.Body>
          <Card.Title
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontWeight: 'normal',
              fontSize: '14px',
            }}
          >
            {ad.title}
            <span style={{ userSelect: 'none' }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-heart-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                />
              </svg>
            </span>
          </Card.Title>
          <Card.Text style={{ fontSize: '25px', fontWeight: 'bold' }}>
            {ad.price}
          </Card.Text>
          <Card.Text style={{ fontSize: '13px' }}>
            {ad.location} - {time}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default ItemSlideShow

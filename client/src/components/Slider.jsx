import React from 'react'
import { Carousel } from 'react-bootstrap'

const Slider = ({ images }) => {
  return (
    <>
      <Carousel style={{ background: '#000' }} indicators={false}>
        {images.map((img) => {
          return (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={`../uploads/${img}`}
                alt="First slide"
                width={500}
                height={500}
                style={{ objectFit: 'contain' }}
              />
            </Carousel.Item>
          )
        })}
      </Carousel>
    </>
  )
}

export default Slider

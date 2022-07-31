import React from 'react'

const ItemDetails = ({ ad }) => {
  return (
    <div className="details_container">
      <h4 className="title">Details</h4>
      <div className="items">
        <div className="item">
          <p className="attribute">Brand</p>
          <p className="value">{ad.brand}</p>
        </div>
        <div className="item">
          <p className="attribute">Price</p>
          <p className="value">{ad.price}</p>
        </div>
        <div className="item">
          <p className="attribute">Condition</p>
          <p className="value">{ad.condition}</p>
        </div>
      </div>

      <hr />

      <div className="description_contianer">
        <h4 className="title">Description</h4>
        <p className="description">{ad.description}</p>
      </div>
    </div>
  )
}

export default ItemDetails

import { IconButton, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { BsThreeDots } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { deleteAd } from '../redux/ads/adsSlice'
import moment from 'moment'

const MyAd = ({ ad }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { title, images, price, _id: id, createdAt } = ad

  const maxLength = 30
  let trimmedString = title.substr(0, maxLength)

  trimmedString = trimmedString.substr(
    0,
    Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))
  )

  const date = moment(createdAt).format('ll')

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleEditBtnClick = () => {
    navigate(`/update/item/${id}`, { state: id })
  }

  return (
    <Card style={{ cursor: 'pointer' }}>
      <div
        style={{
          padding: '2rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: '14px' }}>
          From <span style={{ fontWeight: 'bold' }}>{date}</span>
        </span>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flex: '1',
            marginLeft: '3.5rem',
          }}
        >
          <img
            src={`./uploads/${images[0]}`}
            alt="profile"
            width={50}
            height={50}
          />
          <p
            style={{
              marginBottom: '0px',
              fontSize: '16px',
              fontWeight: 'bold',
              marginLeft: '8px',
            }}
          >
            {title.length > 30 ? `${trimmedString}...` : title}
          </p>
        </div>

        <div
          style={{
            flex: 1,
            justifyContent: 'space-between',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: '14px' }}>Rs {price}</span>
          <span
            style={{
              background: '#23e5db',
              color: '#002f34',
              padding: '4px 2rem',
              borderRadius: '1rem',
            }}
          >
            Active
          </span>
          <span style={{ fontSize: '14px' }}>This ad is currently live</span>

          <IconButton onClick={handleClick}>
            <BsThreeDots />
          </IconButton>
        </div>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          sx={{
            '.MuiPaper-root': {
              width: '10%',
              padding: '.5rem',
              left: 'auto !important',
              right: '300px',
            },
          }}
        >
          <div>
            <MenuItem onClick={handleEditBtnClick}>Edit now</MenuItem>
          </div>
          <MenuItem onClick={() => dispatch(deleteAd(id))}>Delete</MenuItem>
        </Menu>
      </div>
    </Card>
  )
}

export default MyAd

import moment from 'moment'
import { Card, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export const InnerCard = ({ ad }) => {
  const navigate = useNavigate()

  const time = moment(ad.createdAt).fromNow()

  const handleClick = (id) => {
    navigate(`/item/${id}`, { state: ad })
  }

  return (
    <Col md={3} key={ad._id} onClick={() => handleClick(ad._id)}>
      <Card style={{ width: '100%', cursor: 'pointer' }}>
        <Card.Img
          variant="top"
          src={`./uploads/${ad.images[0]}`}
          height={300}
          style={{ objectFit: 'cover' }}
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
            Rs {ad.price}
          </Card.Text>
          <Card.Text style={{ fontSize: '13px' }}>
            {ad.location} - {time}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
}

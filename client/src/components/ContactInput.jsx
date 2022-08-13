import React from 'react'
import { Col } from 'react-bootstrap'

const ContactInput = ({ label, placeholder, type, name, handleChange }) => {
  if (label === 'Description') {
    return (
      <Col xs={12}>
        <p className="input_label" style={{ color: '#fff' }}>
          {label}
        </p>
        <div className="input_container">
          <textarea
            rows="10"
            placeholder={placeholder}
            name={name}
            onChange={handleChange}
          />
        </div>
      </Col>
    )
  }

  return (
    <Col lg={12} xs={12}>
      <p
        className="input_label"
        style={{ color: label === 'Ad title' ? '#fff' : '' }}
      >
        {label}
      </p>
      <div className="input_container">
        <input
          type={type === 'number' ? 'number' : 'text'}
          placeholder={placeholder}
          name={name}
          id="auto-complete-input"
          onChange={handleChange}
        />
      </div>
    </Col>
  )
}

export default ContactInput

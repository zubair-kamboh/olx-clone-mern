import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Form, Row } from 'react-bootstrap'
import '../styles/contact.css'
import ContactInput from '../components/ContactInput'
import { FileUpload } from '../components/FileUpload'
import { postAd, reset } from '../redux/ads/adsSlice'
import toast from 'react-hot-toast'
import { ThreeDots } from 'react-loader-spinner'

const PostAd = () => {
  const [allValues, setAllValues] = useState({
    title: '',
    description: '',
    brand: '',
    condition: '',
    category: '',
    price: null,
    images: [],
    location: '',
  })

  const dispatch = useDispatch()
  const { errorMessage, successMessage, isError, isSuccess, isLoading } =
    useSelector((selector) => selector.ads)

  useEffect(() => {
    if (isError && errorMessage) {
      toast.error(errorMessage)
    }

    if (isSuccess && successMessage) {
      toast.success(successMessage)
    }

    // return () => dispatch(reset())
  }, [isError, isSuccess, errorMessage, successMessage, dispatch])

  const handleChange = (e) => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value })
  }
  const dropDownChange = (e) => {
    setAllValues({ ...allValues, condition: e.target.value })
  }
  const categoryDropdownChange = (e) => {
    setAllValues({ ...allValues, category: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()

    for (let i = 0; i < allValues.images.length; i++) {
      formData.append('images', allValues.images[i].file)
    }

    formData.append('title', allValues.title)
    formData.append('brand', allValues.brand)
    formData.append('category', allValues.category)
    formData.append('condition', allValues.condition)
    formData.append('description', allValues.description)
    formData.append('location', allValues.location)
    formData.append('price', allValues.price)

    dispatch(postAd(formData))

    setAllValues({
      title: '',
      description: '',
      brand: '',
      condition: '',
      category: '',
      price: null,
      images: [],
      location: '',
    })
  }

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
    <div className="contact_page">
      <div className="cliped_bg"></div>
      <Container>
        <div className="contact_us_container">
          <h3 className="heading">POST YOUR AD</h3>
          <p className="description">
            If you need our help, have questions about how to use the platform
            or are experiencing
            <br />
            technical difficulties, please do not hesitate to contact us.
          </p>

          <form
            className="contactform"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <Row className="g-2 gy-4">
              <ContactInput
                label="Ad title"
                placeholder="title..."
                name="title"
                handleChange={handleChange}
              />
              <ContactInput
                label="Description"
                placeholder="Add your ad description..."
                name="description"
                handleChange={handleChange}
              />
              <ContactInput
                label="Brand"
                placeholder="e.g Apple, Samsung..."
                name="brand"
                handleChange={handleChange}
              />

              <div>
                <p className="input_label">Condition</p>

                <Form.Select onChange={dropDownChange}>
                  <option value="New">New</option>
                  <option value="Open">Open</option>
                  <option value="Used">Used</option>
                  <option value="Refurbished">Refurbished</option>
                </Form.Select>
              </div>

              <div>
                <p className="input_label">Categories</p>

                <Form.Select onChange={categoryDropdownChange}>
                  <option value="Mobile Phones">Mobile Phones</option>
                  <option value="Cars">Cars</option>
                  <option value="Motorcycles">Motorcycles</option>
                  <option value="Houses">Houses</option>
                  <option value="TV - Video - Audio">TV - Video - Audio</option>
                  <option value="Tablets Land">Tablets</option>
                  <option value="Tablets Land">Laptops</option>
                  <option value="Plots">Land & Plots</option>
                </Form.Select>
              </div>

              <ContactInput
                label="SET A PRICE"
                placeholder="price..."
                type="number"
                name="price"
                handleChange={handleChange}
              />

              <FileUpload allValues={allValues} setAllValues={setAllValues} />

              <ContactInput
                label="YOUR AD'S LOCATION"
                placeholder="Location..."
                name="location"
                handleChange={handleChange}
              />
            </Row>

            <p className="agreement_heading">
              By submitting this form you agree to our terms and conditions and
              our Privacy Policy which explains how we may collect, use and
              disclose your personal information including to third parties.
            </p>

            <div>
              <Button style={{ background: '#333333' }} type="submit">
                Post Now
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  )
}

export default PostAd

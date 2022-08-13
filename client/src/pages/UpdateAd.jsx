import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Form, Row } from 'react-bootstrap'
import '../styles/contact.css'
import ContactInput from '../components/ContactInput'
import { FileUpload } from '../components/FileUpload'
import { reset, updateAd } from '../redux/ads/adsSlice'
import toast from 'react-hot-toast'
import { ThreeDots } from 'react-loader-spinner'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { useLocation } from 'react-router-dom'

const UpdateAd = () => {
  const [value, setValue] = useState(null)
  const [allValues, setAllValues] = useState({
    title: '',
    description: '',
    brand: '',
    condition: '',
    category: '',
    price: null,
    images: [],
  })

  const dispatch = useDispatch()
  const location = useLocation()
  const id = location.state
  const { errorMessage, successMessage, isError, isSuccess, isLoading } =
    useSelector((selector) => selector.ads)

  useEffect(() => {
    if (isError && errorMessage) {
      toast.error(errorMessage)
    }

    if (isSuccess && successMessage) {
      toast.success(successMessage)
    }
  }, [isError, isSuccess, errorMessage, successMessage, dispatch])

  useEffect(() => {
    return () => dispatch(reset())
  }, [dispatch])

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

    if (allValues.images) {
      for (let i = 0; i < allValues.images.length; i++) {
        formData.append('images', allValues.images[i].file)
      }
    }

    allValues.title && formData.append('title', allValues.title)
    allValues.brand && formData.append('brand', allValues.brand)
    allValues.category && formData.append('category', allValues.category)
    allValues.condition && formData.append('condition', allValues.condition)
    allValues.description &&
      formData.append('description', allValues.description)

    if (value !== null) {
      formData.append('location', value && value.label)
    }

    allValues.price && formData.append('price', allValues.price)

    dispatch(updateAd({ id, ad: formData }))

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
    <div className="contact_page ">
      <div className="cliped_bg updatead_page"></div>
      <Container>
        <div className="contact_us_container">
          <h3 className="heading" style={{ color: '#fff' }}>
            UPDATE YOUR AD
          </h3>
          <p className="description" style={{ color: '#fff' }}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi natus
            veniam eveniet id, distinctio ipsa rerum veritatis porro ea soluta.
            <br />
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda,
            ratione.
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

              <div className="input-control">
                <label className="mb-2 text-uppercase">
                  Enter your location
                </label>
                <GooglePlacesAutocomplete
                  selectProps={{
                    value,
                    onChange: setValue,
                  }}
                  autocompletionRequest={{
                    componentRestrictions: { country: ['pk'] },
                  }}
                />
              </div>
            </Row>

            <p className="agreement_heading">
              By submitting this form you agree to our terms and conditions and
              our Privacy Policy which explains how we may collect, use and
              disclose your personal information including to third parties.
            </p>

            <div>
              <Button style={{ background: '#333333' }} type="submit">
                UPDATE
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  )
}

export default UpdateAd

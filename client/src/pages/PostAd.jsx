import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Form, Row } from 'react-bootstrap'
import '../styles/contact.css'
import ContactInput from '../components/ContactInput'
import { FileUpload } from '../components/FileUpload'
import { postAd } from '../redux/ads/adsSlice'
import toast from 'react-hot-toast'
import { ThreeDots } from 'react-loader-spinner'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

const PostAd = () => {
  const [value, setValue] = useState(null)
  const [allValues, setAllValues] = useState({
    title: '',
    description: '',
    brand: '',
    condition: 'New',
    category: 'Mobile Phones',
    price: null,
    images: [],
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

    if (!value) {
      toast.error('Location cannot be empty')
      return
    }

    formData.append('title', allValues.title)
    formData.append('brand', allValues.brand)
    formData.append('category', allValues.category)
    formData.append('condition', allValues.condition)
    formData.append('description', allValues.description)
    formData.append('location', value.label)
    formData.append('price', allValues.price)

    dispatch(postAd(formData))

    setAllValues({
      title: '',
      description: '',
      brand: '',
      condition: '',
      category: 'Mobile Phones',
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
          <h3 className="heading" style={{ color: '#fff' }}>
            POST YOUR AD
          </h3>
          <p className="description" style={{ color: '#fff' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse unde
            amet nihil debitis ea corrupti exercitationem libero! Nam, inventore
            illo!
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Praesentium, ullam?
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
                  <option value="TV">TV</option>
                  <option value="Video - Audio">Video - Audio</option>
                  <option value="Tablets">Tablets</option>
                  <option value="Laptops">Laptops</option>
                  <option value="Land & Plots">Land & Plots</option>
                  <option value="Others">Others</option>
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

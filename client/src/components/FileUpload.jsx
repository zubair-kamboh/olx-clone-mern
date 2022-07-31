import React from 'react'
import ImageUploading from 'react-images-uploading'
import '../styles/fileUpload.css'
import edit from '../images/pencil-square.svg'
import deleteIcon from '../images/x-square-fill.svg'

export function FileUpload({ allValues, setAllValues }) {
  const maxNumber = 3

  const onChange = (imageList) => {
    setAllValues({
      ...allValues,
      images: imageList,
    })
  }

  return (
    <div className="file_uploads">
      <ImageUploading
        multiple
        value={allValues.images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
              className="file_upload_button"
              type="button"
            >
              <img
                src="https://www.olx.com.pk/assets/iconAddPhoto_noinline.8924e2486f689a28af51da37a7bda6ec.svg"
                alt="img"
              />
            </button>
            &nbsp;
            <div style={{ display: 'flex' }}>
              {imageList.map((image, index) => (
                <div
                  key={index}
                  className="image-item mt-2 me-3 position-relative"
                >
                  <img
                    src={image['data_url']}
                    alt=""
                    width="100"
                    style={{ height: '100px' }}
                  />
                  <img
                    src={edit}
                    alt="edit"
                    className="editicon"
                    onClick={() => onImageUpdate(index)}
                  />
                  <img
                    src={deleteIcon}
                    alt="deleteicon"
                    className="deleteicon"
                    onClick={() => onImageRemove(index)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </ImageUploading>
    </div>
  )
}

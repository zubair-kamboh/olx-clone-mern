import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { filterByCategory } from '../redux/ads/adsSlice'

const Categories = () => {
  const [category, setCategory] = useState('')
  const dispatch = useDispatch()

  const handleCategories = (category) => {
    setCategory(category)

    if (!category) {
      return
    }

    dispatch(filterByCategory(category))
  }

  return (
    <ul className="categories_navlinks">
      <li className="navlink" onClick={() => handleCategories('Mobile Phones')}>
        Mobile Phones
      </li>
      <li className="navlink" onClick={() => handleCategories('Cars')}>
        Cars
      </li>
      <li className="navlink" onClick={() => handleCategories('Motorcycles')}>
        Motorcycles
      </li>
      <li className="navlink" onClick={() => handleCategories('Houses')}>
        Houses
      </li>
      <li className="navlink" onClick={() => handleCategories('Tv')}>
        Tv
      </li>
      <li className="navlink" onClick={() => handleCategories('Video-Audio')}>
        Video-Audio
      </li>
      <li className="navlink" onClick={() => handleCategories('Tablets')}>
        Tablets
      </li>
      <li className="navlink" onClick={() => handleCategories('Laptops')}>
        Laptops
      </li>
      <li className="navlink" onClick={() => handleCategories('Land & Plots')}>
        Land & Plots
      </li>
      <li className="navlink" onClick={() => handleCategories('Others')}>
        Others
      </li>
    </ul>
  )
}

export default Categories

import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import AdCard from '../components/Cards'
import Categories from '../components/Categories'
import '../styles/home.css'

const Home = () => {
  return (
    <div>
      <Container>
        <Categories />
        <AdCard />
      </Container>
    </div>
  )
}

export default Home

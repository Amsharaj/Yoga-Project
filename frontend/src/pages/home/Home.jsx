import React from 'react'
import HeroContainer from './Hero/HeroContainer'
import Gallary from './Gallary/Gallary'
import PopularClasses from './PopularClasses/PopularClasses'
import PopularTeacher from './PopularTeacher/PopularTeacher'
import useAuth from '../../hooks/useAuth'
import Map from './Map/Map'

const Home = () => {

  return (
    <section>
      <HeroContainer />
      <div className='max-w-screen-xl mx-auto'>
        <Gallary />

        <PopularClasses />
        <PopularTeacher />
      </div>
      <Map />
    </section>
  )
}

export default Home
import React from 'react'
import { Container } from 'react-bootstrap'
import MainContainer from '../components/MainContainer'
import MiddleContainer from '../components/MiddleContainer'
import SideNavbar from '../components/SideNavbar'

const MainScreen = () => {

  return (
    <Container fluid className='m-0 p-0 min-vh-100 bg-main d-flex justify-content-start'>
        <SideNavbar/>
        <MiddleContainer showTerm={'notifications'}/>
        <MainContainer showTerm={'notifications'}/>
    </Container>
  )
}

export default MainScreen
import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import MainContainer from '../components/MainContainer'
import MiddleContainer from '../components/MiddleContainer'
import SideNavbar from '../components/SideNavbar'

const MainScreen = () => {
    const [whatToShow, setWhatToShow] = useState('notifications')

    const showInSideNav = (str) =>{
        setWhatToShow(str);
    }
  return (
    <Container fluid className='m-0 p-0 min-vh-100 bg-main d-flex justify-content-start'>
        <SideNavbar onClickHandler={showInSideNav}/>
        <MiddleContainer showTerm={whatToShow}/>
        <MainContainer showTerm={whatToShow}/>
    </Container>
  )
}

export default MainScreen
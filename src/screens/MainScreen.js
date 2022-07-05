import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import MainContainer from '../components/MainContainer'
import MiddleContainer from '../components/MiddleContainer'
import SideNavbar from '../components/SideNavbar'
import { UserContext } from '../contexts/userContext'

const MainScreen = () => {
    const navigate = useNavigate()

    const [whatToShow, setWhatToShow] = useState('notifications')

    const { user } = useContext(UserContext)

    const showInSideNav = (str) =>{
        setWhatToShow(str);
    }

    useEffect(()=>{
      if(!user)
        navigate('/login')
    },[navigate, user])

  return (
    <Container fluid className='m-0 p-0 min-vh-100 bg-main d-flex justify-content-start'>
        <SideNavbar onClickHandler={showInSideNav}/>
        <MiddleContainer showTerm={whatToShow}/>
        <MainContainer showTerm={whatToShow}/>
    </Container>
  )
}

export default MainScreen
import React from 'react'
import { Container } from 'react-bootstrap'
import LogInForm from '../components/LogInForm'

const LoginScreen = () => {
  return (
      <Container fluid className='m-0 p-0 min-vh-100 bg-main flex-center'>
          <LogInForm />
      </Container>
  )
}

export default LoginScreen
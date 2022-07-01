import React from 'react'
import { Container } from 'react-bootstrap'
import RegisterForm from '../components/RegisterForm'

const RegisterScreen = () => {
  return (
      <Container fluid className='m-0 p-0 min-vh-100 bg-main flex-center'>
          <RegisterForm />
      </Container>
  )
}

export default RegisterScreen
import React, { useContext, useState } from 'react'
import { Col, FloatingLabel, Form, FormGroup, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';
import userService from '../services/userService'

const RegisterForm = () => {

    const navigate = useNavigate();
    const { setUser } = useContext(UserContext)

    const [registerValues, setRegister] = useState({
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: ''
    })

    const submitHandler = (e) =>{
        e.preventDefault();
        
        // potrebna jos validacija

        userService.register(registerValues)
        .then(res => {
            localStorage.setItem("user", JSON.stringify(res))
            setUser(res)
            navigate('/main')
        })
        .catch(err => console.log(err))
    }

  return (
    <Form onSubmit={submitHandler} className='p-3 p-md-5 py-3 py-md-4 rounded bg-dark text-light'>
        <h5 className='text-start p-0 m-0 display-6'>Sign Up</h5>
        <p className='text-muted p-0 m-0 py-3 pb-4 text-start'>Please enter your valid credentials</p>
        <FormGroup as={Row}>
            <Col md='6' className='pe-1'>
                <FloatingLabel
                    label="First Name"
                    className="mb-3"
                >
                    <Form.Control value={registerValues.firstName} onChange={e => setRegister({...registerValues, firstName: e.target.value})} type="text" className='bg-dark  w-100 text-light' placeholder="Enter your first name..." />
                </FloatingLabel>
            </Col>
            <Col md='6' className='ps-1'>
                <FloatingLabel
                    label="Last Name"
                    className="mb-3"
                >
                    <Form.Control value={registerValues.lastName} onChange={e => setRegister({...registerValues, lastName: e.target.value})} type="text" className='bg-dark w-100 text-light' placeholder="Enter your last name..." />
                </FloatingLabel>
            </Col>
        </FormGroup>
        <FloatingLabel
            label="Username"
            className="mb-3 w-100"
        >
            <Form.Control value={registerValues.username} onChange={e => setRegister({...registerValues, username: e.target.value})} type="text" className='bg-dark text-light responsive-input-register' placeholder="Enter your username..." />
        </FloatingLabel>
        <FloatingLabel
            label="E-Mail"
            className="mb-3"
        >
            <Form.Control value={registerValues.email} onChange={e => setRegister({...registerValues, email: e.target.value})} type="text" className='w-100 bg-dark text-light' placeholder="Enter your e-mail adress..." />
        </FloatingLabel>
        <FormGroup as={Row}>
            <Col md='6' className='pe-1'>
                <FloatingLabel
                    label="Password"
                    className="mb-3"
                >
                    <Form.Control value={registerValues.password} onChange={e => setRegister({...registerValues, password: e.target.value})} type="password" className='bg-dark text-light' placeholder="Enter your password..." />
                </FloatingLabel>
            </Col>
            <Col md='6' className='ps-1'>
                <FloatingLabel
                    label="Confirm Password"
                    className="mb-3"
                >
                    <Form.Control type="password" className='bg-dark text-light' placeholder="Confirm your password..." />
                </FloatingLabel>
            </Col>
        </FormGroup>
        {/* <FloatingLabel
            label="Phone number"
            className="mb-3"
        >
            <Form.Control type="text" className='w-100 bg-dark text-light' placeholder="Enter your phone number..." />
        </FloatingLabel> */}
        <input type='submit' className='btn py-2 mt-4 w-100 btn-main text-dark' value={'Sign in'} />
        <Link className='text-light m-0 p-0' to='/'>
            <p className='w-100 text-start pt-3'>Back to home</p>
        </Link>
      </Form>
  )
}

export default RegisterForm
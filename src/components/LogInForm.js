import React, { useContext, useEffect, useState } from 'react'
import {FloatingLabel, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import userService from '../services/userService'
import { UserContext } from '../contexts/userContext'

const LogInForm = () => {
    const navigate = useNavigate()

    const { setUser } = useContext(UserContext)

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const [err, setError] = useState({
        username: false,
        password: false
    })

    function validate(){
        let usernameError = false
        let passError = false

        if(!username){
            usernameError = true
        }
        if(!password){
            passError = true
        }

        if(usernameError || passError){
            setError({
                username: usernameError,
                password: passError
            })
            return false;
        }

        setError({
            username: false,
            password: false
        })
        return true;
    }

    const submitHandler = (e) =>{
        e.preventDefault();
        
        if(validate())
            userService.logIn({
                username,
                password
            })
            .then(res => {
                localStorage.setItem("user", JSON.stringify(res))
                setUser(res)
                navigate('/main')
            })
            .catch(err =>{
                console.log(err)
            })
    }

  return (
      <Form onSubmit={submitHandler} className='p-3 p-md-5 rounded bg-dark text-light'>
        <h5 className='text-start p-0 m-0 display-6'>Sign In</h5>
        <p className='text-muted p-0 m-0 py-3 pb-4 text-start'>Welcome back</p>
        <FloatingLabel
            label="Username"
            className="mb-3"
        >
            <Form.Control value={username} onChange={e => setUserName(e.target.value)} type="text" className={`bg-dark responsive-input text-light ${err.username ? 'border-danger' : ''}`} placeholder="Enter your username..." />
        </FloatingLabel>
        <FloatingLabel
            label="Password"
            className="mb-4"
        >
            <Form.Control value={password} onChange={e => setPassword(e.target.value)} type="password" className={`bg-dark responsive-input text-light ${err.password ? 'border-danger' : ''}`} placeholder="Enter your password..." />
        </FloatingLabel>
        <Link className='text-light my-3' to='/'>Forgott password? Click here</Link><br></br>
        <input type='submit' className='btn py-2 mt-4 w-100 btn-main text-dark' value={'log in'} />
        <p className='text-light m-0 p-0 py-3'>or</p>
        <p className='text-light m-0 p-0'>No account yet?</p>
        <Link className='text-light m-0 p-0' to='/register'>Click here to register</Link><br></br>
      </Form>
  )
}

export default LogInForm
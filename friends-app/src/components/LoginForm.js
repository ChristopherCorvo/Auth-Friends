import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'

import { axiosWithAuth } from '../util/axiosWithAuth'

import styled from 'styled-components'

const FormContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    border: 2px solid black;
    width: 30%;
    height: 10vh;
`

const initialState = {
    username: '',
    password: ''
}

const LoginForm = (props) => {
    const [credentials, setCredentials] = useState(initialState)

    let history = useHistory()

    const handleChanges = (e) => {
        setCredentials({...credentials,
        [e.target.name]:e.target.value})
    }

    const login = (e) => {

        e.preventDefault()

         // Step 1: Make a Post request and send the credentials object to the api
         axiosWithAuth()
            .post('/api/login', credentials)
                .then((res)=> {
                    window.localStorage.setItem('token',res.data.payload)
                    // Step 2: navigate the user to the /protected (landing page)
                    history.push('/protected') // need to add url extension
                })
                .catch((error) => {
                    console.log(error)
                })
    }
    
    
    return (
        <FormContainer>
            <Form onSubmit={login}>
                <div>
                    <label>Username:</label>
                    <input
                        name='username'
                        type='text'
                        value={credentials.username}
                        onChange={handleChanges}
                    />
                </div>

                <div>
                    <label>Password:</label>
                    <input
                        name='password'
                        type='password'
                        value={credentials.password}
                        onChange={handleChanges}
                    />
                </div>
                <button>Submit</button>

            </Form>
        </FormContainer>
    )
}

export default LoginForm

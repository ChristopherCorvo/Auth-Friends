import React, { useState } from 'react'

import { axiosWithAuth } from '../util/axiosWithAuth'

import { Redirect, useHistory } from 'react-router-dom'

import styled from 'styled-components'

const FormContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;

`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    border: 2px solid black;
    width: 30%;
    height: 18vh;
`

const initialState = {
    name: '',
    age: '',
    email: '' 
}

const FriendForm = () => {
    const [newFriend, setNewFriend] = useState(initialState)
    const history = useHistory()

    const renderRedirect = () => {
        console.log('Im in the renderRedirect function')
        // return <Redirect to ='/protected'/>
        history.goBack();
    }
    
    const handleChanges = (e) => {
        
        setNewFriend({
            ...newFriend,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        axiosWithAuth()
            .post('/api/friends', newFriend)
            .then((res) => {
                console.log(res)
                renderRedirect()
            })
            .catch((error)=> {
                console.log(error)
            })    
    }
    
    return (
        
        <FormContainer>
            <Form onSubmit={onSubmit}>
                <div>
                    <label>name: <span/></label>
                    <input
                        name= 'name'
                        type= 'text'
                        value= {newFriend.name}
                        onChange= {handleChanges}
                    />
                </div>

                <div>
                    <label>age: <span/></label>
                    <input
                    name= 'age'
                    type= 'text'
                    value= {newFriend.age}
                    onChange= {handleChanges}
                    />
                </div>

                <div>
                    <label>email: <span/></label>
                    <input
                    name= 'email'
                    type= 'text'
                    value= {newFriend.email}
                    onChange= {handleChanges}
                    />
                </div>

                <button>Submit</button>
            </Form>
        </FormContainer>
    )
}

export default FriendForm

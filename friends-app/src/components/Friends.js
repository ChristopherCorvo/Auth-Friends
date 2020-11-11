import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'

import { axiosWithAuth } from '../util/axiosWithAuth'

import styled from 'styled-components'

const FriendContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    .friend {
        text-align: center;
        border: 2px solid black;
        width: 25%;
        margin-top: 1%;
    }
`



const Friends = () => {
    
    const [friendData, setFriendData] = useState([])
    
    useEffect(() => {
            axiosWithAuth()
                .get('/api/friends')
                .then((res)=>{
                    console.log(res.data)
                    setFriendData(res.data)
                })
                .then((error)=>{
                    console.log(error)
                })
    },[])
    
    return (
        <div>
            <FriendContainer>
                <h1>Look At My Friends!</h1>
                <Link to='/friendform'> Create A New Friend</Link>
                {friendData.map(friend => (
                    <div key={friend.id} className='friend'>
                        <h3>{friend.name}</h3>
                        <h3>{friend.age}</h3>
                        <h3>{friend.email}</h3>
                    </div>
                ))}
            </FriendContainer>
            
        </div>
    )
}

export default Friends

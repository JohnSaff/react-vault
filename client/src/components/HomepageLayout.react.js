import React, { Suspense, useState, useEffect } from 'react';

import FriendCard from './FriendCard.react';
import NoFriendsCard from './NoFriendsCard.react';
import AddFundsCard from './AddFundsCard.react';
import LoginButton from './LoginButton.react';
import { useAuth0 } from "@auth0/auth0-react";


const styles = {
    container:{
        padding: '16px',
    },
    helloAndBalanceContainer:{
        display: 'grid',
        gridTemplateColumns : 'auto auto',
        gridGap: '16px',
        marginBottom: '8px',
        padding:'8px',
    },
    hello:{
        gridColumn: '1 / span 2',
        fontSize: '24px',
    },
    button:{
        textAlign: 'center',
        height: '24px',
        borderStyle: 'solid',
        borderWidth:'1px',
        backgroundColor: '#b6d7a8ff',
        borderRadius: '6px',
      },
}

function HomepageLayout(props) {
    const [showAddFundsCard,setShowAddFundsCard] = useState(false)
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const [friends, setFriends] = useState([])
    const [fetchedUser, setFetchedUser] = useState({})
    const [balance,setBalance] = useState(0)
    const [refresh, setRefresh] = useState(false)

    useEffect(()=>{
        if(user && user != null){
            const sendData = {user:user}
            fetch('http://localhost:9000', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:
                JSON.stringify(sendData)
            }
            )
            .then(res => res.json())
            .then(res=> {
                setFetchedUser(res.user)
                setFriends(res.friends)
                setBalance(res.user.balance)
            })
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            .catch(err=> console.log)
        }
    },[user,refresh,showAddFundsCard,balance])

    const indexes = [...Array(friends.length).keys()]
    const items = indexes.map(index =>
        <FriendCard
            name={friends[index].name}
            email={friends[index].email}
            user={user}
            key={index}
            handler={setRefresh}/>
        )

    return (

        isAuthenticated ? (

        <div style={styles.container}>

            <div style={styles.helloAndBalanceContainer}>
                <Suspense fallback=''>
                    <div style={styles.hello}>
                        Hello {fetchedUser.name}
                    </div>
                </Suspense>
                <div style={{textAlign:'left'}}>
                    Balance: £{fetchedUser != {} ? balance.toFixed(2) : 'loading...'}
                </div>
                <div style={{textAlign:'right'}}>
                    <button style={styles.button} onClick={()=>setShowAddFundsCard(true)}>
                        Add Funds?
                    </button>
                </div>
                </div>

            <div>
                {items.length ? items : <NoFriendsCard handler={props.handler} />}
            </div>
            {showAddFundsCard && <AddFundsCard user={user} handler={setShowAddFundsCard} onChange={setRefresh} />}
        </div>
        ) : isLoading? <div>Loading....</div> : <LoginButton/>
    )
};

export default HomepageLayout

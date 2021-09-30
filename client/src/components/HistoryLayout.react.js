import React, { Suspense, useState, useEffect }  from 'react'

import HistoryItem from './HistoryItem.react'
import NoHistoricalTransactions from './NoHistoricalTransactions.react'
import LoginButton from './LoginButton.react';

import { useAuth0 } from "@auth0/auth0-react";


const styles = {
    container:{
        padding: '16px',
    },
}

function HistoryLayout () {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [history, setHistory] = useState([])
    useEffect(()=>{
        if(user && user != null){
            const sendData = {user:user}
            fetch('http://localhost:9000/history', {
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
                setHistory(res.history)
            })
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            .catch(err=> console.log)
        }
    },[user])

    const items = history.map(item =>
        <HistoryItem user={user} from={item.from} to={item.to} amount ={item.amount}/>
        )
    return (
        !isAuthenticated ? (
            isLoading? <div>Loading....</div> : <LoginButton/>
          ) :
        <div style={styles.container}>
            <h2>HISTORY</h2>
            {items ? items : <NoHistoricalTransactions />}
        </div>
    )
}

export default HistoryLayout

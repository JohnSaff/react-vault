import React, { useState} from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const styles={
    button:{
        textAlign: 'center',
        height: '24px',
        borderStyle: 'solid',
        borderWidth:'1px',
        backgroundColor: '#b6d7a8ff',
        borderRadius: '6px',
        marginTop: '8px'
    },
    container:{
        position: 'absolute',
        top: '0',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        marginLeft: '-16px'
    },
    card:{
        width: '70%',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'white',
        borderRadius: '8px',
        borderStyle: 'solid',
        borderWidth: '1px',
        marginTop: '60%',
        display: 'grid',
        gridGap: '8px',
        padding: '8px'
    }
}


function PaymentCard(props){
    const [amount, setAmount] = useState(0)

    const paySomeone = (evt) =>{
        evt.preventDefault()
        if(props.user && props.user != null){
          const sendData = {'user':props.user , 'amount': amount, 'recipient': props.recipient}
          fetch('http://localhost:9000/pay', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(sendData)
          }
          )
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          .catch(err=> console.log)
        }
        props.handler()
      }


    return(
        <div style={styles.container}>
            <div style={styles.card}>
                Pay a friend
                <form onSubmit={paySomeone}>
                    <label>Amount </label>
                <input type='number' step='0.01' id='paymentcard' value={amount} onChange={e => setAmount(e.target.value)} /><br/>
                <input style={styles.button} type='submit' value='Submit' onClick={props.handler}></input>
                </form>
            </div>
        </div>
    )
}

export default PaymentCard

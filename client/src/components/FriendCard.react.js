import React, {useState, useEffect } from 'react';
import PaymentCard from './PaymentCard.react';

const styles = {
    container: {
      fontFamily: 'Montserrat, Helvetica, sans-serif',
      display: 'grid',
      gridTemplateColumns: 'auto 48px',
      padding: '8px',
      borderStyle: 'solid',
      borderWidth: '1px',
      borderRadius: '8px',
      backgroundColor: 'white',
      alignItems: 'center',
      marginBottom: '8px'
    },
    payButton:{
      fontFamily: 'Montserrat, Helvetica, sans-serif',
      textAlign: 'center',
      height: '24px',
      borderStyle: 'solid',
      borderWidth:'1px',
      backgroundColor: '#b6d7a8ff',
      borderRadius: '6px',
    },
  };

  function FriendCard(props) {
    const [showPaymentCard,setShowPaymentCard] = useState(false)

    useEffect(()=>{
      props.handler(true)
    },[showPaymentCard])

    return (
      <>
        <div style={styles.container}>
            <div>{props.name}</div>
            <button style={styles.payButton} onClick={setShowPaymentCard}>pay</button>
        </div>
        {showPaymentCard && <PaymentCard name={props.name} recipient={props.email} user={props.user} handler={setShowPaymentCard}/>}
      </>
    );
  }

  export default FriendCard

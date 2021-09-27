import React from 'react'
import App from '../App';

const styles = {
    container: {
      fontFamily: 'Montserrat, Helvetica, sans-serif',
      display: 'grid',
      gridTemplateColumns: 'auto 80px',
      padding: '8px',
      borderStyle: 'solid',
      borderWidth: '1px',
      borderRadius: '8px',
      backgroundColor: 'white',
      margin: '8px',
      alignItems: 'center',
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

  function NoFriendCard(props) {
    return (
        <div style={styles.container} >
            <div>you currently have no friends</div>
            <button style={styles.payButton} onClick={props.handler}>add one?</button>
        </div>
    );
  }

  export default NoFriendCard

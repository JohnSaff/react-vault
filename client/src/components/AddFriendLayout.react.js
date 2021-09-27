import React, { useState} from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './LoginButton.react';

const styles = {
    layout:{
        padding: '16px',
    },
    container: {
      fontFamily: 'Montserrat, Helvetica, sans-serif',
      display: 'grid',
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
      marginLeft: '8px',
    },
  };

  function AddFriendLayout(props) {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [email, setEmail] = useState('')
    const [foundFriend , setFoundFriend] = useState('')
    const [submittedForm, setSubmittedForm] = useState(false)

    const addFreind = (evt) =>{
      evt.preventDefault()
      setSubmittedForm(true)
      if(user && user != null){
        const sendData = {'user':user , 'email': email}
        fetch('http://localhost:9000/addfriend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData)
        }
        )
        .then(res => res.ok ? setFoundFriend(true) : null)
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        .catch(err=> console.log)
      }
    }

    return (
        !isAuthenticated ? (
          isLoading? <div>Loading....</div> : <LoginButton/>
        ) :
        <>
        <div style={styles.layout}>
            <h2>Add friend</h2>
            <div style={styles.container}>
                <div>To add a friend type in their email address here</div>
                <form onSubmit={addFreind}>
                <input type={'email'} value={email} onChange={e => setEmail(e.target.value)} ></input>
                <input style={styles.payButton} type = 'submit' value='Add Friend'/>
                </form>
            </div>
        </div>
        {!foundFriend && submittedForm && <div> Friend not found</div>}
        {foundFriend && submittedForm && <div> Friend Added!</div>}
        ,</>
    );
  }

  export default AddFriendLayout

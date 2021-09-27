import React , {useState} from 'react';

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
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        marginLeft: '-16px',
    },
    card:{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
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
        padding: '8px',
        zIndex: '5'
    }
}


function AddFundsCard(props){
    const [amount, setAmount] = useState(0)


    const addFunds = (evt) =>{
        evt.preventDefault()
        if(props.user && props.user != null){
          const sendData = {'user':props.user , 'amount': amount}
          fetch('http://localhost:9000/addfunds', {
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
          props.onChange()

        }
        props.handler()
      }

      const closeModal = () =>{
          props.handler()
      }

    return(
        <div>
            <div style={styles.card} >
                Add Funds
                <form onSubmit={addFunds}>
                    <label>Amount </label>
                <input type='number' step='0.01' id='addFunds' value={amount} onChange={e => setAmount(e.target.value)} /><br/>
                <input style={styles.button} type = 'submit' value='Submit' onClick={props.handler}/>
                </form>
            </div>
            <div style={styles.container} onClick={closeModal}>
            </div>
        </div>
    )
}

export default AddFundsCard

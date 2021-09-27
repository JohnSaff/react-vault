import React from 'react'

const styles = {
    container : {
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '8px',
        borderStyle: 'solid',
        borderWidth: '1px',
        marginBottom: '8px'
    }
}

function HistoryItem(props){

    const userSent = props.from == props.user.email
    return(
        <div style={styles.container}>
            <div>
                {userSent ? 'sent' : 'recieved'}
            </div>
            <div>
                £{props.amount}
            </div>
            <div>
                {userSent ? 'to' : 'from'}
            </div>
            <div>
                {userSent ? props.to : props.from}
            </div>
        </div>
    )
}
export default HistoryItem

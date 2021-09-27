import './App.css';
import React, { Suspense, useState, useEffect } from 'react';
import transactionHistory from './2089679.svg';
import addFriend from './addFriend.svg';

import vaultLogo from './safe.svg';
import HomepageLayout from './components/HomepageLayout.react';
import HistoryLayout from './components/HistoryLayout.react';
import AddFriendLayout from './components/AddFriendLayout.react'
import LogoutButton from './components/LogoutButton.react';
import { useAuth0 } from "@auth0/auth0-react";
import { withAuth0 } from '@auth0/auth0-react';

var footer = {
  backgroundColor:'#FFFFFF',
  position: 'fixed',
  width: '100%',
  bottom: '0',
  left: '0',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  height: '64px',
}

var footerButton ={
  height:'50px',
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {display:'home'}
    this.gotoHistory = this.gotoHistory.bind(this)
    this.gotoHome = this.gotoHome.bind(this)
    this.gotoAddFriend = this.gotoAddFriend.bind(this)
  }
  gotoHistory() {
    this.setState({...this.state,
      display:'history'
    });
  };
  gotoHome() {
    this.setState({...this.state,
      display:'home'
    })
  }

  gotoAddFriend(){
    this.setState({...this.state,
      display:'addFriend'
    })
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <div className='header-container' onClick={this.gotoHome}>
            <img src={vaultLogo} style={footerButton} ></img>
            VAULT.
          </div>
        </header>
        <Suspense fallback='loading.....'>
          <div className="content">
            {this.state.display == "home" ? <HomepageLayout handler={this.gotoAddFriend}/> : this.state.display == "history" ? <HistoryLayout /> : <AddFriendLayout />}
          </div>
        </Suspense>
        <div style={footer}>
            <button className='button' onClick={this.gotoHistory}><img src={transactionHistory} style={footerButton} /></button>
            <button className='button' onClick={this.gotoAddFriend}><img src={addFriend} style={footerButton} /></button>
            <LogoutButton/>
        </div>
      </div>
    );
  }
}

export default withAuth0(App);

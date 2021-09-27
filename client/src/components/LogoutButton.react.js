import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import logoutImg from '../logout.svg';

var footerButton ={
    height:'50px',
  }

function LogoutButton(){
    const { logout } = useAuth0();

    return(
        <button className='button' onClick={()=> logout({ returnTo: window.location.origin })}><img src={logoutImg} style={footerButton} /></button>
    )
}

export default LogoutButton

import "./header.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { auth } from '../../firebaseConnection'
import { signOut } from 'firebase/auth'

function Header() {

  async function handleLogout(){
    await signOut(auth);

  }
  
  return (
    <header>
      <Link className="logo" to="/home">
        Flix
      </Link>
      <Link className="logo" to="/">
        Sair
      </Link>
    </header>
  );
}

export default Header;

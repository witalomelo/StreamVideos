import React, { useEffect } from 'react';
import "./Nav.css"

function Nav() {
    const[show, setShow] = React.useState(false);

    useEffect(() => {
      window.addEventListener("scroll", () => {
        setShow(window.scrollY > 100);
      });
    }, []);
    

  return (
    <div className={`nav-container ${show && "nav-container-black"}`}>
        {/* <img 
        className="nav-logo"
        src="https://seeklogo.com/images/H/hd-filmes-logo-4F7B194314-seeklogo.com.png"
        alt="logo"
        ></img> */}
        <img 
        className="nav-avatar"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPsVAeFlYeYOEUzb3TV1ML91_LPkkFML5lRQcMdr9nQu2CqO-WzT-RLmkM5_cOKvkaBkI&usqp=CAU"
        alt="Pasquadev"></img>
    </div>
  );
}

export default Nav;
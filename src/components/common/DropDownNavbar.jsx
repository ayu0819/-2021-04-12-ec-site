import React,{useState} from 'react';
import {DropdownButton,DropdDown} from '../common';

const DropDownNavbar = () => {
    const [click,setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    // DropDown Functions
    const onMouseEnter = () => {
        if (window.innerWidth < 960) {
            setDropdown(false);
        }else{
            setDropdown(true);
        }
    }
    const onMouseLeave = () => {
        if (window.innerWidth < 960) {
            setDropdown(false);
        }else{
            setDropdown(false);
        }
    }
   
 return(
  <>
    <nav className="navbar1">
      <a href="#" className="navbar-logo1">
        sample
      </a>
      <div className="menu-icon1" onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
      </div>
      <ul className={click ? 'nav-menu1 active1' : 'nav-menu1'}>
       <li className="nav-item1">
          <a href="#" className="nav-links1" onClick={closeMobileMenu}>
              Home
          </a>
       </li>
       <li className="nav-item1"
           onMouseEnter={onMouseEnter}
           onMouseLeave={onMouseLeave}
       >
          <a href="#" className="nav-links1" onClick={closeMobileMenu}>
              Service <i className="fas fa-caret-down" />
          </a>
          {dropdown && <DropdDown />}
       </li>
       <li className="nav-item1">
          <a href="#" className="nav-links-mobile1" onClick={closeMobileMenu}>
              Sign Up
          </a>
       </li>
      </ul>
      <DropdownButton /> 
      </nav>
      </>
 )
}

export default DropDownNavbar;

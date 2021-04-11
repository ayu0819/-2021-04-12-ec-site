import React,{useState} from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import {SidebarData} from '../common';
import {IconContext} from 'react-icons';
import styled from 'styled-components';

const media = {
    sp: '@media(max-width: 650px)'
}

const Navbar = styled.div`
    height: 80;
    display: flex;
    justify-content: start;
    align-items: center;
    cursor: pointer;

    li {
        cursor: pointer;
    }
    p{
        margin-left: 1em;
        ${media.sp} {
       display: none !important;
   }
    }
`;

const IconText = () => {
    const [sidebar, setSidebar] = useState(false)
    const showSidebar = () => setSidebar(!sidebar)
 return(
  <>
  <IconContext.Provider value={{color: '#383838'}}>
   <Navbar>
         <FaIcons.FaBars className="category-icon" onClick={showSidebar} />
         <p onClick={showSidebar}>カテゴリーから探す</p>
   </Navbar>
   <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
       <ul className='nav-menu-items' onClick={showSidebar}>
           <li className='navbar-toggle'>
                   <AiIcons.AiOutlineClose className='menu-bars' />
           </li>
           <SidebarData />
       </ul>
   </nav>
   </IconContext.Provider>
  </>
 )
}

export default IconText;

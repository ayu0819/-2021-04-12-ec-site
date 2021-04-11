// import React,{useState} from 'react';
// import * as FaIcons from "react-icons/fa";
// import * as AiIcons from "react-icons/ai";
// import {sidebarData} from './SidebarData';
// import {IconContext} from 'react-icons';
// // import {Link} from 'react-router-dom';

// const Navbar = () => {
//     const [sidebar, setSidebar] = useState(false)

//     const showSidebar = () => setSidebar(!sidebar)
//  return(
//   <>
//   <IconContext.Provider value={{color: '#fff'}}>
//    <div className="navbar">
//      <a src="#" className="menu-bar">    
//          <FaIcons.FaBars onClick={showSidebar} />
//      </a>    
//    </div>
//    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
//        <ul className='nav-menu-items' onClick={showSidebar}>
//            <li className='navbar-toggle'>
//                <a href="#" className='menu-bars'>
//                    <AiIcons.AiOutlineClose />
//                </a>
//            </li>
//            {sidebarData.map((item, index) => {
//                return (
//                    <li key={index} className={item.cName}>
//                        <a href={item.path}>
//                          {item.icon}
//                          <span>{item.title}</span>
//                        </a>
//                    </li>
//                );
//            })}


           
//        </ul>

//    </nav>
//    </IconContext.Provider>
//   </>
//  )
// }

// export default Navbar;

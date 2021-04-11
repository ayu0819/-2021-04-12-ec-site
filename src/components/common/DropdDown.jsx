import React,{useState} from 'react';
import {DropMenuItems} from '../common/DropMenuItem';

const Dropdown = () => {
    const [click,setClick] = useState(false);
    const handleClick = () => setClick(!click)
   
 return(
  <>
   <ul onClick={handleClick} className={click ? 'dropdown-menu1' : 'dropdown-menu1'}>
     {DropMenuItems.map((item, index) => {
         return(
             <li key={index}>
                 <a 
                 href={item.path}
                 className={item.cName}
                 onClick={() => setClick(false)}
                 >
                  {item.title}
                 </a>
             </li>
         )
     })}
   </ul>
  </> 
 )
}

export default Dropdown;





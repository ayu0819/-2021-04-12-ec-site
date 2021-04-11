import React,{useCallback,useState} from 'react';
import {Nav,CategoryBar} from '../common';
import styled from 'styled-components';

const media = {
    sp: '@media(max-width: 650px)'
}

const Headers = styled.div`
    ${media.sp} {
        padding: 0 0 1em 0 ;
   }
`;

const Header = () => {
const [open, setOpen] = useState(false);
const handleDrawerToggle = useCallback((event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
    }
    setOpen(!open);
}, [setOpen,open]);

 return(
    <div className="common__center">
        <Headers>
        <Nav />      
    <CategoryBar />
     </Headers>
    </div>
 
 )
}
export default Header;
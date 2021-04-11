import React,{ useEffect, useState } from 'react';
import styled from 'styled-components';
import * as MdIcons from "react-icons/md";
import * as GrIcons from "react-icons/gr";

const Contents = styled.div`
 margin-top:2em;
 display:flex;
 justify-content:space-around;
 align-items:center;
`;

const Flex = styled.div`
 display:flex;
 justify-content:center;
 align-items: center;
 li:nth-child(n+2):nth-last-child(n+2) {
  background: #ea352d;
  color: #fff;
  width: 2em;
  height: 2em;
  border-radius: 50%;
  text-align: center;
  display: inline-block;
  margin: 0.3em;
  padding: 0.5em;
  transition: all ease-out .3s;
}
`;

const Page2 = ({showPerPage,onPaginationChange,total}) => {
    const [counter, setCounter] = useState(1);
    const [numberOfButtons, setNumberOfButtons] = useState(Math.ceil(total / showPerPage))
    
    useEffect(() => {
        const value = showPerPage * counter;
        onPaginationChange(value - showPerPage, value)
    }, [counter])

    const onButtonClick = (type) => {
        if(type === "prev") {
         if(counter === 1) {
             setCounter(1)
         } else {
             setCounter(counter -1);
         }
        }else if (type === "next") {
            setCounter(counter +1);
            if(Math.ceil(total / showPerPage) === counter){
                setCounter(counter);
        } else {
            setCounter(counter + 1);
        }
        
};
    };
 return(
<Contents>
     <Flex>
         <li onClick={()=>onButtonClick('prev')}><GrIcons.GrFormPrevious className="Icon-size" /></li>
         {
       new Array(numberOfButtons).fill("").map((el,index) => (
        <li><a onClick={()=>setCounter(index+1)}>
            {index + 1}
            </a></li>
       ))
   }
         <li onClick={()=>onButtonClick('next')}><MdIcons.MdNavigateNext className="Icon-size" /></li>
         
     </Flex>
</Contents>    
 )
}

export default Page2;
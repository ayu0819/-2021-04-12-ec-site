import React,{ useEffect, useState } from 'react';
import styled from 'styled-components';

const Button = styled.button`
 text-align:center;
 background-color: green;
`;

const Contents = styled.div`
 display:flex;
 justify-content:space-around;
`;

const Page = ({showPerPage,onPaginationChange,total}) => {
    const [counter, setCounter] = useState(1);

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
            if(Math.ceil(total / showPerPage) === counter){
                setCounter(counter);
        } else {
            setCounter(counter + 1);
        }
};

    };
 return(
<Contents>
     <Button
      onClick={()=>onButtonClick('prev')}
     >Pre</Button>
     <Button
      onClick={()=>onButtonClick('next')}
     >Next</Button>
</Contents>    
 )
}

export default Page;
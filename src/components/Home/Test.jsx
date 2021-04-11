import React from 'react';
import {push} from "connected-react-router";
import {useDispatch} from "react-redux";

const Test = (props) => {
    const dispatch = useDispatch();
 return(
     <> 
   <button onClick={() => dispatch(push(props.link))}>
       ボタンです
   </button>
     </>
 )
}

export default Test;



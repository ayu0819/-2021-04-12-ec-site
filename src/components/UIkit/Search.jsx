import React,{useState,useCallback} from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import {push} from 'connected-react-router';

const Button = styled.button`
   background: #f5f5f5;
    border-radius: 4px;
    width: 6em;
    padding: 1em 0.5em;
    margin-left: 1.5em;
`;

const SearchContents = styled.div`
width:100%;
   display: flex;
   padding: 0.7em 0;
   align-items:center;
   input {
    background: #f5f5f5;
border-radius: 4px;
width: 100%;
height: 40px;
line-height: 1.5;
    font-size: 16px;
    border: 1px solid #ccc;
   }
   
`;

const Search = (props) => {
   const dispatch = useDispatch();
   const [keyword, setKeyword] = useState("");
   const inputKeyword = useCallback((event) => {
      setKeyword(event.target.value)
    }, [setKeyword]);

   // ②searchKeyword
   const searchKeyword = (event, keyword) => {
      const url = '/products/?search=' + keyword;
      dispatch(push(url));
    }
    
 return(
   <SearchContents>
        <input 
        type="search" 
        id="site-search" 
        name="search"
        aria-label="Search" 
        value={keyword}
        onChange={inputKeyword}
        />

<Button onClick={(event) => searchKeyword(event,keyword)}>Search</Button>
   </SearchContents>

 )
}

export default Search;
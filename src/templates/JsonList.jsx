import React,{useState} from 'react';
import JsonDate from "../MOCK_DATA.json";
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';

const App = styled.div`
 text-align:center;
`;

const User = styled.div`
margin: 2em auto;
 background-color: #ddd;
 width: 100%;
 max-width: 600px;
 border-radius: 0.5em;
 padding: 1em;
 border: solid 2px #bcbcbc;
`;

    // .slice で ファイルをスライスする
    const JsonList = () => {
    const [users, setUsers] = useState(JsonDate.slice(0, 50));
    const [pageNumber, setPageNumber] = useState(0);

    const usersPerPage = 10;
    const pagesVisited = pageNumber * usersPerPage;

    const displayUsers = users.slice(pagesVisited, pagesVisited + usersPerPage)
    .map((user) => {
        return(
        <User>
          <h3>{user.firstName}</h3>
          <h3>{user.lastName}</h3>
          <h3>{user.email}</h3>
        </User>
        );
    });

    const pageCount = Math.ceil(users.length / usersPerPage);
    const changePage = ({selected}) => {
     setPageNumber(selected)
    };

 return(
   <App>
       {displayUsers}
       <ReactPaginate 
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disableInitialCallback={"paginationDisabled"}
        activeClassName={"paginationActive"}
       />
   </App>
 );
}

export default JsonList;
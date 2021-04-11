import React,{useState} from 'react';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';

const App = styled.div`
 text-align:center;
`;
    const Pagenation = () => {
    const [users, setUsers] = useState();
    const [pageNumber, setPageNumber] = useState(0);

    const usersPerPage = 10;
    const pageCount = Math.ceil(users.length / usersPerPage);
    const changePage = ({selected}) => {
     setPageNumber(selected)
    };

 return(
   <App>
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

export default Pagenation;
import React,{useState,useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {db} from '../../firebase/index';
import {push} from 'connected-react-router';
import styled from 'styled-components';

const Category = styled.li`
    color: rgb(56, 56, 56);
    transition: all ease-out .3s;
    cursor: pointer;
    line-height: 3.2em;
    :hover {
    background-color: #f5f5f5;
    transition: all ease-out .3s;
    }
`;

const SidebarData = (props) => {
    const dispatch = useDispatch();

    const selectMenu = (event, path) => {
        dispatch(push(path));
      }
        // firebase の カテゴリーの初期値を設定 (useState) ②
        const [filters, setFilters] = useState ([
            {func: selectMenu, label: "すべて", id : "all", value:"/"}
          ])
     // ② fairebase と接続するために useEffect を使う
     useEffect(() => {
        db.collection('categories')
        .orderBy('order' , 'asc')
        .get()
        .then(snapshots => {
          const list = []
          snapshots.forEach(snapshot => {
            // バッククウォート を使って js の変数を使用している
            const category = snapshot.data()
            list.push({func: selectMenu, label: category.name, id: category.id, value: `/products/?category=${category.id}`})
          })
          setFilters(prevState => [...prevState, ...list])
        })
      }, []);
    
 return(
  <>
     {filters.slice(2, 8).map(filter => (
                   <Category
                    key={filter.id}
                    onClick={(e) => filter.func(e, filter.value)}
                   >
                   {filter.label}
                   </Category>  
                 ))}
  </>
 )
}

export default SidebarData;

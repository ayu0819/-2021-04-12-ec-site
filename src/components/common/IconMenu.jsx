import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import * as AiIcons from "react-icons/ai";
import { useDispatch,useSelector } from 'react-redux';
import {push} from 'connected-react-router';
import {UserMenu} from '../common';
import Badge from '@material-ui/core/Badge';
import {getProductsInLike, getProductsInCart, getUserId} from '../../reducks/users/selectors';
import {db} from '../../firebase';
import {fetchProductsInCart,fetchProductsInLike} from '../../reducks/users/operations';

const Icons = styled.div`
    display: flex;
    position:relative;
    align-items: center;
`;

const IconMenu = () => {
    const [dropdown, setDropdown] = useState(false);
    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);
    const userId = getUserId(selector);

    let productsInCart = getProductsInCart(selector);
    let productsInLike = getProductsInLike(selector);

        // DropDown Functions
        const onMouseEnter = () => {
            if (window.innerWidth < 960) {
                setDropdown(false);
            }else{
                setDropdown(true);
            }
        }
        const onMouseLeave = () => {
            if (window.innerWidth < 960) {
                setDropdown(false);
            }else{
                setDropdown(false);
            }
        }

        useEffect(() => {
            const unsubscribe = db.collection('users').doc(userId).collection('cart')
                .onSnapshot(snapshots => {
    
                    snapshots.docChanges().forEach(change => {
                        const product = change.doc.data();
                        const changeType = change.type
    
                        switch (changeType) {
                            case 'added':
                                productsInCart.push(product);
                                break;
                            case 'modified':
                                const index = productsInCart.findIndex(product => product.cartId === change.doc.id)
                                productsInCart[index] = product;
                                break;
                            case 'removed':
                                productsInCart = productsInCart.filter(product => product.cartId !== change.doc.id);
                                break;
                            default:
                                break;
                        }
                    });
    
                    dispatch(fetchProductsInCart(productsInCart))
                });
            return () => unsubscribe()
        },[]); 

        useEffect(() => {
            const unsubscribe = db.collection('users').doc(userId).collection('like')
              .onSnapshot(snapshots => {
                snapshots.docChanges().forEach(change => {
                  const product = change.doc.data();
                  const changeType = change.type
        
                  switch (changeType) {
                    case 'added':
                      productsInLike.push(product);
                      break;
                    case 'modified':
                      const index = productsInLike.findIndex(product => product.likeId === change.doc.id)
                      productsInLike[index] = product;
                      break;
                    case 'removed':
                      productsInLike = productsInLike.filter(product => product.likeId !== change.doc.id)
                      break;
                    default:
                      break;
                  }
                })
                dispatch(fetchProductsInLike(productsInLike))
              })
              return () => unsubscribe;
          }, []);

 return(
     <Icons>
         <Badge badgeContent={productsInLike.length} color="secondary">
       <AiIcons.AiOutlineHeart className="menu__Icon" onClick={() => dispatch(push('/user/like'))} />
       </Badge>

     <Badge badgeContent={productsInCart.length} color="secondary">
       <AiIcons.AiOutlineShoppingCart className="menu__Icon" onClick={() => dispatch(push('/cart'))} />
     </Badge>
       <div className="nav__item"
onMouseEnter={onMouseEnter}
onMouseLeave={onMouseLeave}
>
<AiIcons.AiOutlineUser className="menu__Icon" onClick={() => dispatch(push('/user'))} />
       {dropdown && <UserMenu />}
</div>
     </Icons>
 )
}

export default IconMenu;
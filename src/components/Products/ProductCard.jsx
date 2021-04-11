import React,{useState} from 'react';
import {push} from "connected-react-router"
import styled from 'styled-components';
import NoImage from '../../assets/img/no_image.png';
import {useDispatch,useSelector} from "react-redux";
import * as BiIcons from "react-icons/bi";
import {ProductMenu} from '../Products';
import {getUserRole} from "../../reducks/users/selectors";

const media = {
    sp: '@media(max-width: 650px)'
}

const Icon = styled.div`
    /* padding: 1em; */
    position: absolute;
    bottom: 1em;
    left: 1em;
    background-color: #ea352d;
    transition: all ease-out .3s;
    width: 47px;
    height: 47px;
    border-radius: 50%;
    :hover {
        background-color: #aa2e28;
        transition: all ease-out .3s;
    }
`;

const Card = styled.div`
position: relative;
    margin: 0 0.8em 1em 0;
    background-color:#fff;
    width: 100%;
    max-width: 14.4em;
    border-radius:1em;
    border: solid 2px #eaeaea;
    position: relative;
    transition: all ease-out .3s;
    cursor: pointer;
    img {
        border-radius: 0.8em 0.8em 0 0;
        /* width: 100%; */
        width: 230.7px;
       height: 230.7px;
       object-fit: cover;
    }
    :hover{
        transition: all ease-out .3s;
        background-color: #f5f5f5;;
    }
    ${media.sp} {
        margin: 0.5em;
   }
`;

const TextArea = styled.div`
    padding: 1em;
`;

const Price = styled.div`
    align-items: center;
    background: rgba(0,0,0,.4);
    border-radius: 0 14px 14px 0;
position: absolute;
top: 190px;
left: 0;
    p {
        color: #fff;
        font-size: 1em;
        padding: 0.3em 1em;
    }
`;

const ProductCard = (props) => {
    const selector = useSelector(state => state);
    const userRole = getUserRole(selector)
    const isAdministrator = (userRole === "administrator");
    const [dropdown, setDropdown] = useState(false);
    const dispatch = useDispatch()
    const images = (props.images.length > 0) ? props.images : [{path:NoImage}]
    const price = props.price.toLocaleString();
  
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
 return(
     <Card>
         {isAdministrator && (
         <Icon
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
         >
           <BiIcons.BiDotsHorizontalRounded className="product__Icon" />
           {dropdown && <ProductMenu id={props.id}/>}
      </Icon>
        )}
        <figure>
         <img
            src={images[0].path}
            onClick={() => dispatch(push('/product/'+props.id))}
            />
        </figure>    
          <TextArea>
             <p>{props.name}</p>
         </TextArea>
         <Price>
         <p>￥{price}</p>
         </Price>
     </Card>
 )
}

export default ProductCard;
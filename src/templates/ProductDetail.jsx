import React, { useEffect,useState,useCallback } from 'react';
import { db, FirebaseTimestamp } from '../firebase/index';
import { useSelector,useDispatch } from "react-redux";
import styled from 'styled-components';
import {ProductButton,ImageSwiper,SizeTable} from '../components/Products';
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import {IconContext} from 'react-icons';
import {addProductToCart, addProductToLike} from '../reducks/users/operations';
import {getUserId} from '../reducks/users/selectors';
import HTMLReactParser from 'html-react-parser';

const media = {
  sp: '@media(max-width: 650px)'
}

const CenterSpacer = styled.div`
 margin: 0 1em;
`;


const Table = styled.div`
 display:flex;
 align-items: center;
 text-align:center;
 justify-content: center;
`;

const Text = styled.p`
 padding-left:0.8em;
`;

const Head = styled.div`
 display:flex;
 align-items: center;
 
  p{
      padding-left:0.5em;
  }
`;

const Contents = styled.div`
   width: 50%;
   ${media.sp} {
    width: 100%;
   }
   h2 {
       padding-top:0;
   }
`;

const ContentsPage = styled.div`
   display:flex;
   justify-content:center;
   padding-top:5em;
   ${media.sp} {
    flex-wrap : wrap;
   }
`;

const Price = styled.p`
  font-size: 2.5em;
  font-weight:bold;
`;

const ProductDetail = () => {
    // 現在のStateを取得する
    const selector = useSelector((state) => state);
    const dispatch = useDispatch();
    const uid = getUserId(selector);
    // 現在の Syore の URL の pathname を取得する
    const path = selector.router.location.pathname;
    // 定数id には、2番目のpathname(id)を取得する
    const id = path.split('/product/')[1];

    // useState setProduct を使用して product を 更新させる
    const [product,setProduct] = useState(null);

    const [isLiked, setIsLiked] = useState(false)

    // -------------------------------------
    //  Firebase から ファイルを取得する
    // (return をレンダーしてから useEffect を読み込む)
    // -------------------------------------
    useEffect(() => {
        // collection の products から id を取得する
        // id を取得するには、上記の selecor と path が必要
        db.collection('products').doc(id).get()
        // ドキュメント から 取り出したいデータ を取り出す
        .then(doc => {
            const data = doc.data();
            // useState の setProduct にdata を渡して product を更新させる
            setProduct(data)
        })
    }, []);
    
        // 画像があるかないか判断する しなければ 仮画像が入る
        // const images = (props.images.length > 0) ? props.images : [{path:NoImage}]
    
    // -------------------------------------
    //  AddProduct関数
    //  useCallBack は 子コンポネートに渡すために使う
    // -------------------------------------     
    const addProduct = useCallback((selectedSize) => {
      const timestamp = FirebaseTimestamp.now();
      dispatch(addProductToCart({
        added_at: timestamp,
        description: product.description,
        images: product.images,
        name: product.name,
        price: product.price,
        productId: product.id,
        quantity: 1,
        // sizes: product.sizes,
        size: selectedSize,
        state: product.state,
        category: product.category,
        shippingArea: product.shippingArea,
        shippingFee: product.shippingFee,
        shippingMethod: product.shippingMethod,
        shippingDay: product.shippingDay,

      }))
    },[product])

    // -------------------------------------
    //  AddLike関数
    //  useCallBack は 子コンポネートに渡すために使う
    // -------------------------------------     
    const addLike = useCallback(() => {
      if(!isLiked) {
        setIsLiked((isLiked) => !isLiked)
        const timestamp = FirebaseTimestamp.now();
        dispatch(addProductToLike({
          added_at: timestamp,
          description: product.description,
          images: product.images,
          name: product.name,
          price: product.price,
          productId: product.id,
          quantity: 1,
        }))
      } else {
        setIsLiked((isLiked) => !isLiked)
        return db.collection('users').doc(uid)
        .collection('like').doc(id)
        .delete()
      }
    },[product,isLiked])

    // -------------------------------------
    //  returnCodeToBr関数
    //  HTML-react-parser で 正規表現を使用して <br> タグを開業につける
    // -------------------------------------  
   const returnCodeToBr = (text) => {
     if(text === "") {
       return text
     } else {
       return HTMLReactParser(text.replace(/\r?\n/g,'<br />'))
     }
   };

 return(
  <div className="common__item">
  <div className="common__center">
    <h2>商品詳細</h2>
         {product && (
                <ContentsPage>
              <Contents>
              <ImageSwiper images={product.images} />
             </Contents>
             <CenterSpacer />
             <Contents>
              <h2>{product.name}</h2>
              <Price>{product.price.toLocaleString()}円</Price>

<ProductButton addProduct={addLike} label={'お気に入りに追加'} color={'button__pink'} icon={<AiIcons.AiOutlineHeart />} />
              <p>{returnCodeToBr(product.description)}</p>
              <SizeTable addProduct={addProduct} product={product} sizes={product.sizes} />
              <hr />

              <IconContext.Provider value={{color: '#747474'}}>

               <Table>
               <Head>
               <AiIcons.AiFillEye />
                 <p><strong>商品状態</strong></p>
                </Head>
                <Text>{product.state}</Text>
               </Table>

               <Table>
               <Head>
               <FaIcons.FaMoneyBillWaveAlt />
                 <p><strong>送料負担</strong></p>
                </Head>
                <Text>{product.shippingFee}</Text> 
               </Table>

               <Table>
               <Head>
               <MdIcons.MdLocalShipping />
                 <p><strong>配送方法</strong></p>
                </Head>
                <Text>{product.shippingMethod}</Text> 
               </Table>

               <Table>
               <Head>
               <AiIcons.AiOutlineFieldTime />
                 <p><strong>発送目安</strong></p>
                </Head>
                <Text>{product.shippingDay}</Text>
               </Table>

               <Table>
               <Head>
               <RiIcons.RiMapPinLine />
                 <p><strong>配送地域</strong></p>
                </Head>
                <Text>{product.shippingArea}</Text>
               </Table>

               </IconContext.Provider>

               <hr />

             </Contents>
             </ContentsPage>
            
         )}
     </div>
     </div>
 )
}

export default ProductDetail;
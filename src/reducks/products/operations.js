import { db, FirebaseTimestamp } from "../../firebase"
import {push} from 'connected-react-router'
import {deleteProductsAction,fetchProductsAction} from "./actions"
import { SetSizeArea } from "../../components/Products"

const productsRef = db.collection('products')

// -------------------------------------
// 商品情報のイテレート用関数 (where条件文)
// -------------------------------------
export const fetchProducts = (category) => {
  return async (dispatch) => {

    let query = productsRef.orderBy('updated_at', 'desc');
    query = category !== '' ? query.where('category', '==', category) : query;
    
    query.get()
      .then(snapshots => {
        const productList = [];
        snapshots.forEach(snapshot => {
          const product = snapshot.data();
          productList.push(product);
        })
        dispatch(fetchProductsAction(productList))
    })
  }
}

export const orderProduct = (productsInCart,amount) => {
  console.log(productsInCart)
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const userRef = db.collection('users').doc(uid);
    const timestamp = FirebaseTimestamp.now();

    let products = [],
        soldOutProducts = [];

     const batch = db.batch()
     
     for (const product of productsInCart) {
       const snapshot = await productsRef.doc(product.productId).get()
       const sizes = snapshot.data().sizes;
       console.log(sizes)
       console.log(product)
       console.log(product.sizes) // sizes が出てくる
       console.log(snapshot)
       console.log(product.size) // sizes が出てくる

       const updatedSizes = sizes.map(size => {
         if(size.size === product.size) {
          console.log(product.size) // undfind
          console.log(size.size) // S M
          console.log(size.quantity) // 数量出てくる
          alert('商品処理')
           // 売り切れだったら 無効
           if(size.quantity === 0) {
             alert('商品がありません')
             soldOutProducts.push(product.name);
             return size
           }
           return{
             size: size.size,
             quantity: size.quantity -1
           }

         } else {
          console.log('何もしなてないよ')
          console.log(size.name)
          console.log(product)
          console.log(product.name)
          console.log(size)
           return size
         }
       })

      // 配列にする
      products.push ({
        id: product.productId,
        images: product.images,
        name: product.name,
        price: product.price,
        size: product.size
      });

      batch.update(
        productsRef.doc(product.productId),
        {sizes: updatedSizes}
      )

      batch.delete(
        userRef.collection('cart').doc(product.cartId)
      )
     }
     
     if (soldOutProducts.length > 0) {
      const errorMessage = (soldOutProducts.length > 1) ?
                            soldOutProducts.join('と'):
                            soldOutProducts[0];
      alert ('大変申し訳ありません。' + errorMessage + 'が在庫切れになったため、注文処理を中断しました。')     
      return false                 
   } else {
      batch.commit()
      .then(() => {
        const orderRef = userRef.collection('orders').doc();

        // ------------------------------------------------------
        // (エラー原因)Failed to add order history TypeError: timestamp.toDate is not a function
        // ------------------------------------------------------
        const date = timestamp.toDate();
        const shippingDate = FirebaseTimestamp.fromDate(new Date(date.setDate(date.getDate() + 3)));
        alert('注文処理に成功しました。やったね。') 
        const history = {
          amount: amount,
          created_at: timestamp,
          id: orderRef.id,
          products: products,
          shipping_date: shippingDate,
          updated_at: timestamp
        }
        alert('注文処理に成功しました。やったね。') 

        orderRef.set(history);
        console.log(history)
        dispatch(push('/user/order'))
        // orderRef.set(history).catch(error => console.error("Failed to add order history", error));
        // console.log('成功')

        // dispatch(push('/order/complete'))
      })
      // .catch(error => console.error("Failed to add order history", error));
      .catch(()=> {
        alert('注文に失敗しました。通信環境をご確認の上、もう一度おねがいします。')
        return false
      })
   }

  }
}


export const saveProduct = ({id,name,description,state,category,shippingArea,shippingFee,shippingMethod,shippingDay,images,price,sizes}) => {
    return async (dispatch) => {
      const timestamp = FirebaseTimestamp.now()

      const data = {
        name: name,
        description: description,
        state: state,
        images: images,
        category: category,
        shippingArea: shippingArea,
        shippingFee: shippingFee,
        shippingMethod: shippingMethod,
        shippingDay: shippingDay,
        updated_at: timestamp,
        price: parseInt(price, 10),
        sizes: sizes
      }

  if (id === "") {
        const ref = productsRef.doc();
        id = ref.id
          data.id = id
          data.created_at = timestamp
  }

      return productsRef.doc(id).set(data, {merge: true})
      .then(()=>{
          dispatch(push('/'))
      }).catch((error) => {
          throw new Error(error)
      })
    }
}

// deleteMenu
export const deleteProduct =  (id) => {
  return async (dispatch, getState) => {
    productsRef.doc(id).delete()
    .then(() => {
      const prevProducts = getState().products.list;
      const nextProducts = prevProducts.filter(product => product.id !== id)
      dispatch(deleteProductsAction(nextProducts))
    })
  }
}
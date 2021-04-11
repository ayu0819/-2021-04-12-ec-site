import {CardElement} from '@stripe/react-stripe-js';
import {showLoadingAction, hideLoadingAction} from "../loading/actions";
import { db } from '../../firebase';
import {push} from "connected-react-router";
import {updateUserStateAction} from '../../reducks/users/actions';

// Headers を コンストっラクター で作成 js(クライアント側) でHeader用の関数を作れる
const headers = new Headers();
// Header にContentTypeを設定 (今回はjsonでbodyに渡す)
headers.set('Content-type', 'application/json');
// あなたのデプロイURLを記述
const BASE_URL = "https://ec-site-903fe.web.app";


// -------------------------------------------
// createCustomer関数
// これは customerData関数 にて引数(email,paymentMethodId, uid)を渡して使用している
// -------------------------------------------
const createCustomer = async (email,paymentMethodId, uid) => {
  const response = await fetch(BASE_URL+"/v1/customer",{
     method: 'POST',
     headers: headers,
     body: JSON.stringify({
         email: email,
         paymentMethod: paymentMethodId,
         userId: uid
     })
  });

  // データをjsonで受け取る
  const customerResponse = await response.json()
  // 受け取った Json を js で使用できる オブジェクト型 に変更し body に返す処理
  return JSON.parse(customerResponse.body)
}

// -------------------------------------------
// retrievePaymentMethod関数 ここ
// これは customerData関数 にて引数(email,paymentMethodId, uid)を渡して使用している
// -------------------------------------------
export const retrievePaymentMethod = async (paymentMethodId) => {
  const response = await fetch(BASE_URL+"/v1/paymentMethod",{
     method: 'POST',
     headers: headers,
     body: JSON.stringify({
         paymentMethodId: paymentMethodId
     })
  });

  // データをjsonで受け取る
  const paymentMethodResponse = await response.json()
  // 受け取った Json を js で使用できる オブジェクト型 に変更し body に返す処理
  const paymentMethod = JSON.parse(paymentMethodResponse.body);
  console.log(paymentMethod);
  return paymentMethod.card
}

// -------------------------------------------
// updatePaymentMethod関数 ここ
// updatePaymentMethod api を呼び出す関数
// -------------------------------------------
const updatePaymentMethod = async (customerId, prevPaymentMethodId, nextPaymentMethodId) => {
  const response = await fetch(BASE_URL + "/v1/updatePaymentMethod", {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      customerId: customerId,
      prevPaymentMethodId: prevPaymentMethodId,
      nextPaymentMethodId: nextPaymentMethodId
    })
  })

  const paymentMethodResponse = await response.json()
  const paymentMethod = JSON.parse(paymentMethodResponse.body);
  return paymentMethod.card
}

// -------------------------------------------
// registerCard関数 (引数: stripe ・ elements は PaymentEdit.jsx のボタンに関係する)
// -------------------------------------------
export const registerCard = (stripe,elements,customerId) => {

    // getState で ユーザー情報を取得する
return async (dispatch, getState) => {
    const user = getState().users
    const email = user.email
    const uid = user.uid

    dispatch(showLoadingAction("登録中..."));

    // ----------------------------------------
      // Stripeバリデーション
      // ----------------------------------------

      // stripe elements (Editでの引数) が Null または undefind ならエラーになる
    if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        console.error("Does not exist stripe or elements");
      dispatch(hideLoadingAction());
        return;
      }
  
      // Get a reference to a mounted CardElement. Elements knows how
      // to find your CardElement because there can only ever be one of
      // each type of element.
      // Editの CardElement のカード情報のエレメント要素を取得
      const cardElement = elements.getElement(CardElement);
  
      // Use your card Element with other Stripe.js APIs
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });
  

      if (error) {
        console.log('[error]', error);
        dispatch(hideLoadingAction());
        alert('error')
        return;
      } 

      //paymentMethod の .idキー を取得
      const paymentMethodId = paymentMethod.id 

      // 初めてカードを登録する場合の処理 (カード情報・顧客の作成)
      if(customerId === "") {
      // 未処理
      console.log(email, paymentMethodId, uid)
      // createCustomer関数 に 引数 (email,paymentMethodId, uid, username) を渡す
      const customerData = await createCustomer(email,paymentMethodId, uid)

      // customerDataの処理 成功・失敗 処理
      // customer を作成できず失敗 → アラート
      if(customerData.id === '') {
        dispatch(hideLoadingAction());
          alert('カード情報の登録に失敗しました。')
          return;
          // それ以外(成功)の時
          // DB と Redux の情報を更新する
      } else {
        // アップデートする情報のオブジェクト
          const updateUserState = {
            customer_id: customerData.id,
            payment_method_id: paymentMethodId
          }

          // ユーザーidに紐づかせて updateUserState をアップデートする
          db.collection('users').doc(uid)
          .update(updateUserState)
          .then(() => {
            // 処理ができれば、updateUserStateAction に updateUserState を渡し、urlに移動する
            // updateUserStateAction は users のaction につくる
            dispatch(hideLoadingAction());
            alert('カード情報に成功しました。');
            dispatch(updateUserStateAction(updateUserState))
            dispatch(push('/user'))
          }).catch((error) => {
            // このままでは stripeでは顧客ができて、firebaseではエラー (データの不整合)
            // delete stripe customer

            dispatch(hideLoadingAction());
            alert('カード情報の登録に失敗しました。');
            return;

          })
      }

      // すでに登録してる顧客
    } else {
      // Store から 現在のusersの payment_method_id 情報をとってくる
        const prevPaymentMethodId = getState().users.payment_method_id
        const updatedPaymentMethod = await updatePaymentMethod(customerId, prevPaymentMethodId, paymentMethodId)

        // updatePaymentMethodが空の時
        if(!updatedPaymentMethod) {
          dispatch(hideLoadingAction());
          alert('お客様情報の登録に失敗しました')
        } else {
          // 成功した時 firebaseの payment_method_id のみを変更(更新)する
          const userState = {
            payment_method_id: paymentMethodId
          }
          db.collection('users').doc(uid)
          .update(userState)
          .then(() => {
            dispatch(updateUserStateAction(userState))
            dispatch(hideLoadingAction());
            alert('お客様情報を更新しました')
            dispatch(push('/user'))
          }).catch(() => {
            dispatch(hideLoadingAction());
            alert('お客様情報の更新に失敗しました')
          })
        }

        
    }

  }
}
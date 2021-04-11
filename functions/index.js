const functions = require('firebase-functions');
// 環境変数を参照 パッケージとシークレットキー情報
const stripe = require('stripe')(functions.config().stripe.key);
const cors = require('cors');
console.log(stripe)


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// -------------------------------------
// sendResponse関数
// レスポンスを返す役割。どのAPIもこの関数を最後に使用して サーバー再度側からクライアントサーバー側にレスポンスを返している
// -------------------------------------
const sendResponse = (response, statusCode, body) => {
    response.send({
        statusCode,
        headers: { "Access-Control-Allow-Origin": "*" },      
        body: JSON.stringify(body)
    })
}

/**
 * req {object} => {email: string, userId: string, paymentMethod: string}
 *  customer は object型
 */


// -------------------------------------
// stripeCustomer関数 Node.js API作成
// -------------------------------------
// req と res 引数にとる
exports.stripeCustomer = functions.https.onRequest((req, res) => {
    // corsHandler はAPIのお決まり定数 これで別ドメインを超えて処理をできるようにしている
  const corsHandler = cors({origin: true})

  // API定数(stripeCustomer) の引数を受け取る (rep, res)
  corsHandler(req, res, ()=> {
      // POSTメソッドかを判定する
      if (req.method !== 'POST') {
          // POSTメソッドでなければ、405エラーを出す
          sendResponse(res,405,{error: "Invalid Request method!"})
      }
     //成功した時の処理 description・email・metadata・payment_methodフィールド を設定
      return stripe.customers.create({
          // 何の役割なのか記述
          description: 'EC App demo user',
          // 顧客に基づくemailを設定。 req.body はリクエストで受け取った body の中身を参照できる
          email: req.body.email,
          // stripeの重複処理を判定する(重要)
          metadata: {userId: req.body.userId},
          payment_method: req.body.paymentMethod
      // 成功した処理 .createメソッドの customer引数 を使用しレスポンスを渡して に200コード設定
      }).then((customer) => {
          sendResponse(res,200,customer)
          alert('firebaseでの登録に成功しました')
      // 失敗した処理  .createメソッドの customer引数 を使用しレスポンスを渡して に500コード設定
      // catchメソッドで受けったErrorを使用している
      }).catch((error) => {
          sendResponse(res,500,{error: error})
          alert('firebaseでの登録に失敗しました')
      })
  })
})


// -------------------------------------
// stripeCustomer関数 Node.js API作成
// -------------------------------------
// req と res 引数にとる
exports.retrievePaymentMethod = functions.https.onRequest((req, res) => {
    // corsHandler はAPIのお決まり定数 これで別ドメインを超えて処理をできるようにしている
  const corsHandler = cors({origin: true})

  // API定数(stripeCustomer) の引数を受け取る (rep, res)
  corsHandler(req, res, ()=> {
      // POSTメソッドかを判定する
      if (req.method !== 'POST') {
          // POSTメソッドでなければ、405エラーを出す
          sendResponse(res,405,{error: "Invalid Request method!"})
      }
      return stripe.paymentMethods.retrieve(
        req.body.paymentMethodId
      ).then((paymentMethod) => {
          sendResponse(res,200,paymentMethod)
          alert('firebaseでの登録に成功しました')
      // 失敗した処理  .createメソッドの customer引数 を使用しレスポンスを渡して に500コード設定
      // catchメソッドで受けったErrorを使用している
      }).catch((error) => {
          sendResponse(res,500,{error: error})
          alert('firebaseでの登録に失敗しました')
      })
  })
})


// -------------------------------------
// updatePaymentMethod関数 Node.js API作成
// -------------------------------------
// req と res 引数にとる
exports.updatePaymentMethod = functions.https.onRequest((req, res) => {
    // corsHandler はAPIのお決まり定数 これで別ドメインを超えて処理をできるようにしている
  const corsHandler = cors({origin: true})

  // API定数(stripeCustomer) の引数を受け取る (rep, res)
  corsHandler(req, res, ()=> {
      // POSTメソッドかを判定する
      if (req.method !== 'POST') {
          // POSTメソッドでなければ、405エラーを出す
          sendResponse(res,405,{error: "Invalid Request method!"})
      }
      return stripe.paymentMethods.detach(
        req.body.prevPaymentMethodId
      ).then((paymentMethod) => {
          return stripe.paymentMethods.attach(
              req.body.nextPaymentMethodId,
              {customer: req.body.customerId}
          ).then((nextPaymentMethod) => {
            sendResponse(res,200,nextPaymentMethod)
            alert('firebaseでの登録に成功しました')
          })
      // 失敗した処理  .createメソッドの customer引数 を使用しレスポンスを渡して に500コード設定
      // catchメソッドで受けったErrorを使用している
      }).catch((error) => {
          sendResponse(res,500,{error: error})
          alert('firebaseでの登録に失敗しました')
      })
  })
})

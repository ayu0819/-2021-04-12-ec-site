import {fetchOrdersHistoryAction,fetchProductsInLikeAction,fetchProductsInCartAction,signInAction,signOutAction} from './actions';
import {push} from 'connected-react-router';
import {auth, db, FirebaseTimestamp} from '../../firebase/index'

const usersRef = db.collection('users')

    // -------------------------------------
    //  fetchOrdersHistory 関数
    // -------------------------------------
export const fetchOrdersHistory = () => {
    return async (dispatch, getState) => {
        const uid = getState().users.uid;
        const list = []

        db.collection('users').doc(uid)
            .collection('orders').get()
            // .orderBy('updated_at', "desc")
            .then(snapshots => {
                snapshots.forEach(snapshot => {
                    const data = snapshot.data();
                    list.push(data)
                    console.log(data)
                });
                dispatch(fetchOrdersHistoryAction(list))
                
            })
    }
}

    // -------------------------------------
    //  addProductToCart 関数
    // ProductEdit(AddProduct関数) の 関数として使う
    // -------------------------------------
    export const addProductToCart = (addedProduct) => {
        return async (dispatch,getState) => {
            const uid = getState().users.uid;
            // 新しくuserコレクションにさぶコレクションとしてCartを作ることができる
            const cartRef = db.collection('users').doc(uid).collection('cart').doc();
            // 今回追加するデータの中にサブコレクションのidをフィールドとして持たせることができる。
            addedProduct['cartId'] = cartRef.id;
            await cartRef.set(addedProduct);
            // 本来ならば、Cartページに移動したい
            dispatch(push('/cart'))
        }
    };

        // -------------------------------------
    //  addLikeToContents 関数
    // ProductEdit(AddProduct関数) の 関数として使う
    // -------------------------------------
    export const addProductToLike = (addedProduct) => {
        return async (dispatch,getState) => {
            const uid = getState().users.uid;
            // 新しくuserコレクションにさぶコレクションとしてCartを作ることができる
            const likeRef = usersRef.doc(uid).collection('like').doc();
            // 今回追加するデータの中にサブコレクションのidをフィールドとして持たせることができる。
            addedProduct['likeId'] = likeRef.id;
            await likeRef.set(addedProduct);
            // 本来ならば、Cartページに移動したい
            dispatch(push('/user/like'))
        }
    };

    // -------------------------------------
    // fetchProductsInCart 関数
    // IconMenu(unsubscribe関数) の 関数として使う
    // -------------------------------------
export const fetchProductsInCart = (products) => {
    return async (dispatch) => {
       dispatch(fetchProductsInCartAction(products))
    }
   };

    // // ユーザーのLike情報のActionを呼び出すのみ
export const fetchProductsInLike = (products) => {
    return async (dispatch) => {
        dispatch(fetchProductsInLikeAction(products))
    }
  }


// 認証リッスン関数 Authで認証
export const listenAuthState = () => {
    return async (dispatch) => {
        return auth.onAuthStateChanged(user => {
            if(user) {
               //認証されててる データーベースから取得した情報をStoreのStateとして持たせる 関数で切り出してもいい
               const uid = user.uid

               db.collection('users').doc(uid).get()
               .then(snapshot => {
                   const data = snapshot.data()

                   dispatch(signInAction({
                       customer_id: (data.customer_id) ? data.customer_id : "",
                       payment_method_id: (data.payment_method_id) ? data.payment_method_id : "",
                       isSignedin: true,
                       role: data.role,
                       uid: uid,
                       username: data.username,
                       email: data.email,
                       prefecture: data.prefecture,
                       city: data.city,
                       other: data.other,
                       description: data.description,
                       post: data.post,
                    //    images: data.images,
                       
                   }))

                //    dispatch(push('/'))
               })

            } else {
                // 認証されてない
                dispatch(push('/signin'))
            }
        })

    }
}

// userEdit関数
export const userEdit = ({id,username, email, prefecture, city, other, post, description,images}) => {
    return async (dispatch) => {
      const timestamp = FirebaseTimestamp.now()

      if (username === "" || email === "" || prefecture === "" || city === "" || other === "" || post === "" || description === "") {
        alert("必須項目が見入力です")
        return false
    }

      const data = {
        created_at: timestamp,
        email: email,
        role: "customer",
        // uid: uid,
        updated_at:  timestamp,
        username: username,
        prefecture: prefecture,
        city: city,
        other: other,
        post: post,
        description: description,
        images: images
      }
      
    //   Firebaseにデータをsetしたらdispatchでhomeに戻る、失敗したら 例外処理 をする {marge: true} で更新する部分の身を更新させる
      // return productsRef.doc(id).set(data, {marge: true})
      // 第2引数 .set(data) は商品を完全に上書きしてしまう 更新した部分だけを更新する方法
      return usersRef.doc(id).set(data, {merge: true})
      .then(()=>{
          dispatch(push('/user'))
      }).catch((error) => {
          throw new Error(error)
      })
    }
}

// signUp関数
// validation thuck型
export const signUp = ({username, email, password, confirmPassword}) => {
    return async (dispatch) => {
     if (username === "" || email === "" || password === "" || confirmPassword === "") {
         alert("必須項目が見入力です")
         return false
     }

     if (password !== confirmPassword) {
         alert("パスワードが一致しません")
         return false
     }

    //  auth の設定
    return auth.createUserWithEmailAndPassword(email,password)
      .then(result => {
          const user = result.user
          
        //   ユーザーが存在していたら
          if(user) {
             const uid = user.uid
             const timestamp = FirebaseTimestamp.now()

             const userInitialData = {
                 created_at: timestamp,
                 email: email,
                 role: "customer",
                 uid: uid,
                 updated_at:  timestamp,
                 username: username
             }
             db.collection('users').doc(uid).set(userInitialData)
          .then(() => {
              dispatch(push('/admin'))
          })
          }
          
      })
    }
}

// Firebase での signOutを行う
export const signOut = () => {
    return async (dispatch) => {
        auth.signOut()
        .then(()=> {
            // ReduxのStoreのログイン情報を変更
            dispatch(signOutAction());
            // signInに移動
            dispatch(push('/signin'))
        })
    }
}

export const ResetPassword = (email) => {
    return async (dispatch) => {
        if(email === "") {
            alert("必須項目が見入力です")
            return false
        } else {
            auth.sendPasswordResetEmail(email)
            .then(() => {
                alert('メールを送りました')
                dispatch(push('/signin'))
            }).catch(() => {
                alert('失敗しました')
            })
        }
    }
}

//signIn 関数
export const signIn = ({email, password}) => {
    return async (dispatch) => {
       //  Validation
        if (email === "" || password === "") {
           alert("必須項目が見入力です")
           return false
        }
   
       //  signInWithEmailAndPassword で ログイン処理を設定する
        return auth.signInWithEmailAndPassword(email,password)
        .then(result => {
           //  ユーザー情報
         const user = result.user;
   
       //   もしもユーザーが存在したら
         if(user) {
             const uid = user.uid
             db.collection('users').doc(uid).get()
             .then(snapshot => {
                 const data = snapshot.data()
   
               //   siginInaction を呼び出して以下の情報に変更する
                 dispatch(signInAction({
                    customer_id: (data.customer_id) ? data.customer_id : "",
                    payment_method_id: (data.payment_method_id) ? data.payment_method_id : "",
                     isSignedin: true,
                     role: data.role,
                     uid: uid,
                     email: data.email,
                     post: data.post,
                     username: data.username,
                     prefecture: data.prefecture,
                     city: data.city,
                     other: data.other,
                     description: data.description,
                     images: data.images,
                 }))
   
                 //認証後に移動
                 dispatch(push('/user'))
             })
         }
        })
    }
   }
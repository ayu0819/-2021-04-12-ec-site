import React from 'react';
import {Route, Switch} from "react-router";
import {Home,Reset,SignIn,SignUp,UserMyPage,Admin,About,Works,ProductEdit,ProductDetail,Test,User,CartList,LikeList,Error,Notification,Category,ProductList,UserEdit,JsonList,Contact,TestPage,UserProducts,UserProductsHistory,Products,OrderConfirm,UserInfo,NotificationForm,OrderHistory,CheckoutWrapper} from "./templates";
// 認証設定
import Auth from './Auth';

const Router = () => {
    return(
        <Switch>

            <Route exact path={"/"} component={Home} />
            <Route exact path={"/signin"} component={SignIn} />
            <Route exact path={"/signup"} component={SignUp} />
            <Route exact path={"/signin/reset"} component={Reset} />
            <Route exact path={"/test"} component={Test} />
            <Route exact path={"/error"} component={Error} />
            {/* <Route exact path={"/product/edit"} component={ProductEdit} /> */}
            {/* <Route exact path={"/about"} component={About} />
            <Route exact path={"/contact"} component={Contact} />
            <Route exact path={"/works"} component={Works} /> */}
            {/* build default ↓ */}
            {/* <Route component={Home} /> */}


            <Auth>
                {/* 正規表現 (/:id)? をつけると、商品ごとのid を表示できる :id は変数 ()? はあってもなくてもマッチするもの */}
                <Route exact path={"(/)?"} component={Home} />
               <Route path={"/product/edit(/:id)?"} component={ProductEdit} />
               <Route path={"/jsonList"} component={JsonList} />
               {/* <Route exact path={"/user"} component={User} /> */}
               <Route exact path={"/product/:id"} component={ProductDetail} />
               <Route exact path={"/cart"} component={CartList} />
               <Route exact path={"/user/like"} component={LikeList} />
               {/* <Route exact path={"/user/notification"} component={Notification} /> */}
               <Route exact path={"/user/category"} component={Category} />
               <Route exact path={"/productList"} component={ProductList} />
               <Route exact path={"/contact"} component={Contact} />
               <Route exact path={"/contact/:id"} component={Contact} />
               {/* <Route exact path={"/user/edit"} component={UserEdit} /> */}
               <Route path={"/user/edit(/:id)?"} component={UserEdit} />
               <Route path={"/TestPage"} component={TestPage} />
               {/* <Route path={"/user/product"} component={UserProducts} /> */}
               <Route path={"/user/products/history"} component={UserProductsHistory} />
               <Route path={"/products(/:id)?"} component={Products} />
               <Route path={"/order/confirm"} component={OrderConfirm} />

               <Route path={"/order/history"} component={OrderHistory} />
               {/* <Route path={"/user(/:id)?"} component={ProductEdit} />
               <Route path={"/user/edit(/:id)?"} component={ProductEdit} /> */}
               <Route path={"/user/info(/:id)?"} component={UserInfo} />
               <Route exact path={"/user"} component={User} />
               {/* <Route exact path={"/user/info"} component={UserInfo} /> */}
               <Route path={"/notification/form(/:id)?"} component={NotificationForm} />
               <Route exact path={"/user/notification"} component={Notification} />
               <Route exact path={"/user/payment/edit"} component={CheckoutWrapper} />
               
               

               
               
            
            {/* <Route exact path={"/product/edit"} component={ProductEdit} /> */}
            </Auth>

        </Switch>
    )
}

export default Router;
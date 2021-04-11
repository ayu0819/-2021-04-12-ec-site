import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware
} from 'redux';
// ③非同期処理
import thunk from 'redux-thunk';

import {connectRouter, routerMiddleware} from "connected-react-router";
// ② routing設定
import {UsersReducer} from "../users/reducers";
import {ProductsReducer} from "../products/reducers";
import {ContactsReducer} from "../Contacts/reducers";
import {NotificationsReducer} from "../Notification/reducers";
// import {CategoriesReducer} from "../categories/reducers";

// ② routing設定 (history) 追加
export default function createStore(history) {
    return reduxCreateStore (
        combineReducers({
            // ② routing設定
            router: connectRouter(history),
            users: UsersReducer,
            products: ProductsReducer,
            contacts: ContactsReducer,
            notifications: NotificationsReducer
            // categories: CategoriesReducer
        }),
       // ② routing設定
        applyMiddleware(
           routerMiddleware(history),
           // ③非同期処理
           thunk
        )
    )
}
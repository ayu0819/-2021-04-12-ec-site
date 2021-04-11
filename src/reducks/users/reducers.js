import * as Actions from './actions';
import initialState from '../store/initialState';

// UsersReducer
export const UsersReducer = (state = initialState.users, action) => {
    switch (action.type) {

        // 購入履歴
        case Actions.FETCH_ORDERS_HISTORY:
            return {
                ...state,
                orders: [...action.payload]
            };

        // お気に入り追加
        case Actions.FETCH_PRODUCTS_IN_LIKE:
             return {
                  ...state,
                //   list: [...action.payload]
                  like: [...action.payload]
            };        

            // カートに追加
        case Actions.FETCH_PRODUCT_IN_CART:
             return {
                  ...state,
                //   list: [...action.payload]
                  cart: [...action.payload]
            }; 

            // サインイン  
        case Actions.SIGN_IN:
            return {
                ...state,
                ...action.payload
            };

            // サインアウト
            case Actions.SIGN_OUT:
            // 初期状態に戻す
            return {
                ...action.payload
            };

            // アップデートアクション
            case Actions.UPDATE_USER_STATE:
            // 初期状態に戻す
            return {
                ...state,
                ...action.payload
            };
        
            default:
                return state
    }
}
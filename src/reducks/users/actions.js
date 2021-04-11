export const FETCH_ORDERS_HISTORY = "FETCH_ORDERS_HISTORY";
export const fetchOrdersHistoryAction = (orders) => {
    return {
        type: "FETCH_ORDERS_HISTORY",
        payload: orders
    }
}

export const FETCH_PRODUCT_IN_CART = "FETCH_PRODUCT_IN_CART";
export const fetchProductsInCartAction = (products) => {
    return {
        type: "FETCH_PRODUCT_IN_CART",
        payload: products
    }
}

export const FETCH_PRODUCTS_IN_LIKE = "FETCH_PRODUCTS_IN_LIKE";
export const fetchProductsInLikeAction = (products) => {
    return {
        type: "FETCH_PRODUCTS_IN_LIKE",
        payload: products
    }
}

// signInAction
export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState) => {
    return {
        type: "SIGN_IN",
        payload:  {
            isSignedIn: true,
            role: userState.role,
            uid: userState.uid,
            username: userState.username,
            email: userState.email,
            post: userState.post,
            images: userState.images,
            prefecture: userState.prefecture,
            city: userState.city,
            other: userState.other,
            description: userState.description,
            images: userState.images,
            customer_id: userState.customer_id,
            payment_method_id: userState.payment_method_id
        }
    }
};

// signOutAction
export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = () => {
    return {
        type: "SIGN_OUT",
        payload:  {
            isSignedIn: false,
            role: "",
            uid: "",
            username: "",
            email: "",
            post: "",
            images: "",
            prefecture: "",
            city: "",
            other: "",
            description: "",
            images: ""
        }
    }
};

// updateUserStateAction
export const UPDATE_USER_STATE = "UPDATE_USER_STATE";
export const updateUserStateAction = (userState) => {
    return {
        type: "UPDATE_USER_STATE",
        payload:  {
            userState
        }
    }
};
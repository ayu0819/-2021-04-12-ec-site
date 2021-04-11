import {createSelector} from 'reselect';

const usersSelector = (state) => state.users;

export const getCustomerId = createSelector(
  [usersSelector],
  state => state.customer_id
);

export const getPaymentMethodId = createSelector(
  [usersSelector],
  state => state.payment_method_id
);

export const getOrdersHistory = createSelector(
  [usersSelector],
  state => state.orders
);

export const getProductsInCart = createSelector(
    [usersSelector],
    state => state.cart
)

export const getProductsInLike = createSelector(
  [usersSelector],
  state => state.like
)

export const getIsSignedIn = createSelector(
    [usersSelector],
    state => state.isSignedIn
)

export const getUserId = createSelector(
    [usersSelector],
    state => state.uid
)

export const getUsername = createSelector(
    [usersSelector],
    state => state.username
)

  export const getUseremail = createSelector(
    [usersSelector],
    state => state.email
)

  export const getUserPost = createSelector(
    [usersSelector],
    state => state.post
  )

  export const getPrefecture = createSelector(
    [usersSelector],
    state => state.prefecture
  )

  export const getCity = createSelector(
    [usersSelector],
    state => state.city
  )
  
  export const getOther = createSelector(
    [usersSelector],
    state => state.other
  )

  export const getDescription = createSelector(
    [usersSelector],
    state => state.description
  )

  export const getImages = createSelector(
    [usersSelector],
    state => state.images
  )

  export const getUserImages = createSelector(
    [usersSelector],
    state => state.images
  )

  // Role
  export const getUserRole = createSelector(
    [usersSelector],
    state => state.role
);
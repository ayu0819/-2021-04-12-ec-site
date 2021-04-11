const initialState = {
   loading: {
      state: false,
      text: ""
  },
   notifications: {
       list: [],
   },
    contacts: {
       list: []
    },
    categories: {
        id: ""
     },
    products: {
        list: []
     },
    users: {
       like: [],
       customer_id: "",
       payment_method_id: "",
       cart: [],
       orders: [],
       isSignedIn: false,
       uid: "",
       username: "",
       email: "",
       prefecture: "",
       city: "",
       other: "",
       post: "",
       description: "",
       images: ""
    }
};

export default initialState
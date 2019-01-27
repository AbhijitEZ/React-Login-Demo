import * as actionTypes from './constant';
let initalState ={
  auth : null,
  commonConfig: null,
  productsData: null,
  productDetail: null,
  singleUser: null,
  productImage: null,
  userInfo : null,
  userAddress : null,
}
let reducer = (state = initalState, action) => {

  switch(action.type){
    case actionTypes.AUTH:
    return {
      ...state,
      auth : action.payload
    }
    case actionTypes.UNAUTH:
    return {
      ...state,
      auth : null
    }
    case actionTypes.CONFIG:
    
    return {
      ...state,
      commonConfig : action.payload
    }
    case actionTypes.FETCH_PRODUCTS:
    return {
      ...state,
      productsData : action.payload
    }
    case actionTypes.FETCH_PRODUCT_DATA:
 
    return {
      ...state,
      productDetail : action.payload.data,
      singleUser : action.payload.users,
      productImage : action.payload.image
    }
    case actionTypes.FETCH_USER_DETAIL:
    return {
      ...state,
      userInfo : action.payload.data
    }
    case actionTypes.FETCH_USER_ADDRESS:
    return {
      ...state,
      userAddress : action.payload.data
    }
    case actionTypes.ADD_ADDRESS:
    return {
      ...state
    }
    case actionTypes.FAV_PRODUCT:
    return {
      ...state,
    }
    case 'WRONG_POST':
    window.location.reload();
    return {
      ...state,
    }

    default:
    return {
      ...state
    }
  }

}

export default reducer;
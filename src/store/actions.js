import * as actionTypes from './constant';


export const authentication = (url, data) => {
  return dispatch => {
    fetch(url, data)
    .then(res => {
      if(res.status!== 200){
        dispatch({type: actionTypes.UNAUTH})
      }
      return res.json();
    })
    .then(result => {
      dispatch({type: actionTypes.AUTH, payload : result.data.authorization})
    })
  }
}
export const commonConfigData = (url) => {
  return dispatch => {
    fetch(url)
    .then(res => {  
      return res.json();
    })
    .then(result => {
     localStorage.setItem('config', JSON.stringify(result.data))
      dispatch({type: actionTypes.CONFIG, payload : result.data})
    })
  }
}

export const productsFetch = (url, data) => {
  return dispatch => {
    fetch(url, data)
    .then(res => {
      return res.json();
    })
    .then(result => {
      dispatch({type: actionTypes.FETCH_PRODUCTS, payload : result.data})
    }).catch(err => 'something is wrong');
  }
}

export const productData = (url, data) => {
  return dispatch => {
    fetch(url, data)
    .then(res => {
      return res.json();
    })
    .then(result => {
      dispatch({type: actionTypes.FETCH_PRODUCT_DATA, payload : {data : result.data, users : result.data.user, image: result.data.images[0]}})
    }).catch(err => 'something is wrong');
  }
}

export const userDetail = (url, data) => {
  return dispatch => {
    fetch(url, data)
    .then(res => {
      return res.json();
    })
    .then(result => {
      console.log(result)
      dispatch({type: actionTypes.FETCH_USER_DETAIL, payload : {data : result.data}})
    }).catch(err => 'something is wrong');
  }
}

export const userFetchAddress = (url, data) => {
  return dispatch => {
    fetch(url, data)
    .then(res => {
      return res.json();
    })
    .then(result => {
      dispatch({type: actionTypes.FETCH_USER_ADDRESS, payload : {data : result.data.address}})
    }).catch(err => 'something is wrong');
  }
}

export const favProduct = (url, data) => {
  return dispatch => {
    fetch(url, data)
    .then(res => {
      return res.json();
    })
    .then(result => {
     console.log(result);
     window.location.reload();
      dispatch({type: actionTypes.FAV_PRODUCT})
      
    }).catch(err => 'something is wrong');
  }
}
export const addAddress = (url, data) => {
  return dispatch => {
    fetch(url, data)
    .then(res => {
      return res.json();
    })
    .then(result => {
     console.log(result);

      dispatch({type: actionTypes.ADD_ADDRESS})
      
    }).catch(err => 'something is wrong');
  }
}

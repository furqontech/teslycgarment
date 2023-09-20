import { View, Text, Alert, AsyncStorage } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

export function homeFetchDataSuccess(data_product: Object) {
  return {
    type: "HOME_FETCH_DATA_SUCCESS",
    data_product
  };
}






export function homeFetchData() {
  return function(dispatch) {

    fetch('https://dummyjson.com/products', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => response.json())
    .then((responseJson) => {
      // alert(JSON.stringify(responseJson))
      var data_product = responseJson;
      return dispatch(homeFetchDataSuccess(data_product));    
    })
    .catch((error) => {
      console.log(error);
    })
    
    
      

     
  };
}
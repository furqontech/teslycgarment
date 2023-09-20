const initialState = {
  data_product: []
};
export default function(state: any = initialState, action: Function) {
  switch (action.type) {
  	

    case "HOME_FETCH_DATA_SUCCESS":
      return { ...state, data_product: action.data_product };

    default:
      return state;
  }
}
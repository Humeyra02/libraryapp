import actionTypes from "../actions/actionTypes"

const initialState={
    pending: false,
    success: false,
    books: [],
    error: false,
    errorMessage: ""
}

// API tarafi ile iletisime gecicegimiz icin ayrintili baslangic state i yazdik


const booksReducer=(state=initialState,action)=>{
    //ilk parantez ici kosul alanidir.
    switch (action.type) {
    case actionTypes.bookActions.GET_BOOKS_START:
        return {
           ...state,
           pending: true 
        }
    case actionTypes.bookActions.GET_BOOKS_SUCCESS:
        return{
            ...state,
            pending:false,
            success:true,
            books:action.payload
        }
    case actionTypes.bookActions.GET_BOOKS_FAIL:
        return{
            ...state,
            pending: false,
            success: false,
            error: true,
            errorMessage: action.payload 
        }
    default:
        return state
  }
}

export default booksReducer
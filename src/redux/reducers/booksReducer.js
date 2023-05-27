import actionTypes from "../actions/actionTypes"


const initialState = {
    pending: true,
    success: false,
    books: [],
    error: false,
    errorMessage: ""
}

// API tarafi ile iletisime gecicegimiz icin ayrintili baslangic state i yazdik


const booksReducer = (state = initialState, action) => {
    //ilk parantez ici kosul alanidir.
    switch (action.type) {
        case actionTypes.bookActions.GET_BOOKS_START:
            return {
                ...state,
                pending: true
            }
        case actionTypes.bookActions.GET_BOOKS_SUCCESS:
            return {
                ...state,
                pending: false,
                success: true,
                error: false,
                books: action.payload
            }
        case actionTypes.bookActions.GET_BOOKS_FAIL:
            return {
                ...state,
                pending: false,
                success: false,
                error: true,
                errorMessage: action.payload
            }
        case actionTypes.bookActions.ADD_BOOK:

            return {
                ...state,
                books: [...state.books, action.payload]
            }

        // reducer bu sayede kitap eklemesi gerektiginde nasil eklemesi gerektigini biliyor
        case actionTypes.bookActions.DELETE_BOOK:

            var filteredBooks = state.books.filter(item => item.id !== action.payload) // yani id si esit olmayani yeni sepete koymamis olacak
            return {
                ...state,
                books: filteredBooks
            }
        case actionTypes.bookActions.EDIT_BOOK:

            /**filter yontemi ile yaptigimizda degisen kitap en alta gelmis oluyor, 
             * o yuzden for dongusu ile yapmak daha uygun olucak
            */
            /*const filteredArr=state.books.filter(item=>item.id !== action.payload.id)
            return{
                ...state,
                books:[...filteredArr,action.payload]
            }*/

            /**for dongusu */
            const tempArr = []
            for (let i = 0; i < state.books.length; i++) {
                if (state.books[i].id !== action.payload.id) {
                    tempArr.push(state.books[i])
                } else {
                    tempArr.push(action.payload)
                }
            }
            return {
                ...state,
                books: tempArr
            }

        case actionTypes.bookActions.DELETE_BOOKS_AFTER_DELETE_CATEGORY:
                // payload olarak category id si gelecek
                var filteredBooks = state.books.filter(item => item.categoryId !== action.payload)
                return{
                    ...state,
                    books: filteredBooks
                }
        default:
            return state
    }
}

export default booksReducer

/*case actionTypes.bookActions.ADD_BOOK:

1.YOL
let newArray=state.books
newArray.push(action.payload)

return {
    ...state,
    books: newArray
}
2.YOL
return{
    ...state,
    books:[...state.books,action.payload]
}*/


/**case actionTypes.bookActions.DELETE_BOOK:
        
    1.YOL

        let emptyArr=[]
        for(let i=0,i<state.books.length, i++){
            if(state.books[i].id !== action.payload)
        }{
            emptyArr.push(state.books[i])
        }
    
        return{
            ...state,
            books: emptyArr
        }

        2.YOL

        let filteredBooks=state.books.filter(item => item.id !== action.payload) // yani id si esit olmayani yeni sepete koymamis olacak
        return{
            ...state,
            books: filteredBooks
        }
        default:
        return state
  } */
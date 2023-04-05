const actionTypes ={
    //butun typelari burda tutucaz. 
    bookActions:{
        /*bu bir degisken*/ 
        GET_BOOKS_START:"GET_BOOKS_START",
        GET_BOOKS_SUCCESS:"GET_BOOKS_SUCCESS",
        GET_BOOKS_FAIL:"GET_BOOKS_FAIL",
        ADD_BOOK:"ADD_BOOK" //YENI BIR GOREV TANIMLADIK
    },
    categoryActions:{
        GET_CATEGORIES_START:"GET_CATEGORIES_START",
        GET_CATEGORIES_SUCCESS:"GET_CATEGORIES_SUCCESS",
        GET_CATEGORIES_FAIL:"GET_CATEGORIES_FAIL"
    },
    themeActions:{
        CHANGE_THEME:"CHANGE_THEME"
    }
}

export default actionTypes
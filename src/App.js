import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
//import axios from "axios";
import api from "./api/api";
import urls from "./api/urls";
import actionTypes from "./redux/actions/actionTypes";
import Loading from "./components/Loading";
import Error from "./components/Error";

function App() {
  const { booksState, categoriesState } = useSelector((state) => state)
  const dispacth = useDispatch()

  // get books ve get categories yapmamizin sebebi: uygulama ilk acilirken
  // butun verileri state e yuklemek

  // GET BOOKS 

  useEffect(() => {
    //axios.get("http://localhost:3004/books") - http://localhost:3004 bu kisim api nin icinde zaten tanimlandi. axios import etmemize gerek yok bu sayfada.

    dispacth({ type: actionTypes.bookActions.GET_BOOKS_START })
    api
      .get(urls.books) // end point i de urls.books kismiyla vermis olduk.
      .then(res => {
        setTimeout(() => {
          dispacth({ type: actionTypes.bookActions.GET_BOOKS_SUCCESS, payload: res.data })
        }, 1000)
      })
      .catch(err => {
        dispacth({ type: actionTypes.bookActions.GET_BOOKS_FAIL, payload: "kitaplari cekme islemi esnasinda hata olustu" })
      })

    //GET CATEGORIES

    dispacth({ type: actionTypes.categoryActions.GET_CATEGORIES_START })
    api
      .get(urls.categories)
      .then(res => {
        setTimeout(() => {
          dispacth({ type: actionTypes.categoryActions.GET_CATEGORIES_SUCCESS, payload: res.data })
        }, 1000)
      })
      .catch(err => {
        dispacth({ type: actionTypes.categoryActions.GET_CATEGORIES_FAIL, payload: "category bilgilerini cekerken bir hata olustu" })
      })

  }, []);
  if (booksState.pending === true || categoriesState === true)
    return <Loading />;
  if( booksState.error === true || categoriesState.error === true )
  return <Error/>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />


        <Route path="*" element={<NotFound />} />
        {/** yildiz isaretinin anlami hic bir pathe uymazsa bu yildizli path calissin demek ve yildizli path ise error sayfasi icin */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;


/**
 * function App() {
  const allStates=useSelector(state=>state)
  console.log(allStates.booksState)  <= bu sadece ozel bir state istedigimizde kullanacagumiz yontem
                                        yani butun stateler icinde bana sadece booksState getir
  return (
    <div>
      <h1>Library</h1>
    </div>
  );
}

 */

/**
 * SADECE BOOKSSTATE yada TEK BIR STATE E ABONE OLMAK ISTERSEK BUNU YAPABILIRIZ
 *
 * 
 * function App() {
  const booksState=useSelector(state=>state.bookState)
                                    (dondurulen tum stateler icindeki bookstate i dondur demek)
  console.log(booksState)
  return (
    <div>
      <h1>Library</h1>
    </div>
  );
}
 */

/**
 * function App() {
  const {booksState,categoriesState}=useSelector(state=>state)
          // console.log(booksState)
          // console.log(categoriesState)

          >>>> statelere ayri ayri abone olduk. 

          >>>> es6 ile gelen destructing method yani tersten islem.

  return (
    <div>
      <h1>Library</h1>
    </div>
  );
}
 */
import React from "react";

import { useSelector } from "react-redux";

function App() {
  const allStates=useSelector(state=>state)
  console.log(allStates)
  return (
    <div>
      <h1>Library</h1>
    </div>
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